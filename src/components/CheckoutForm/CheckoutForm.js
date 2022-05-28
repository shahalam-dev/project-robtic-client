import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutForm = ({ orderId }) => {
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    getBillingData();
  }, [orderId]);

  const getBillingData = async () => {
    if (orderId) {
      const orderInfo = {
        uid: userId,
        orderId,
      };
      const data = await axios.post(
        `https://robtic.herokuapp.com/create-payment-intent`,
        orderInfo
      );
      setClientSecret(data.clientSecret);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    const toastId = toast.loading("Please wait...");
    // confirm payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
        },
      });

    if (intentError) {
      toast.update(toastId, {
        render: "Payment Declined :(",
        type: "error",
        isLoading: false,
      });
    }

    if (paymentIntent && paymentIntent.id) {
      const tnxId = paymentIntent.id;
      const updateStatus = {
        uid: userId,
        orderId,
        tnxId,
      };
      const res = await axios.post(
        "https://robtic.herokuapp.com/update-payment-info",
        updateStatus
      );
      toast.update(toastId, {
        render: "Payment Successful!",
        type: "success",
        isLoading: false,
      });
      setTimeout(() => {
        toast.dismiss(toastId.current);
      }, 4000);

      setTimeout(() => {
        navigate("dashboard/cart", { replace: true });
      }, 2000);

      console.log(res);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div
        className="card-actions justify-end mt-8"
        type="submit"
        disabled={!stripe || !elements || !clientSecret}
      >
        <button className="btn btn-success">Confirm Payment</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
