import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import UpdateProfile from "../UpdateProfile/UpdateProfile";

const Payment = () => {
  const [orderData, setOrderData] = useState({});
  const params = useParams();
  const { id } = params;

  const userId = localStorage.getItem("user_id");

  const stripePromise = loadStripe(
    "pk_test_51L3Z0dCDcBaL9oBgw9qWZH9rUFBmw72uUmUDIqsBD0soDAyr16tLPBV6uzmAOEGLdQEvxuVausDAh7B7fKokPd9N00RCu6pCar"
  );
  useEffect(() => {
    getOrderData();
  }, [id]);

  const getOrderData = async () => {
    const data = await axios.get(
      `https://robtic.herokuapp.com/order-info?uid=${userId}&orderId=${id}`
    );
    setOrderData(data);
  };

  return (
    <>
      <div className="my-14 py-14 bg-base-200">
        <h2 className="my-4 text-center text-2xl md:6xl font-bold">Checkout</h2>
        <div className="flex flex-col-reverse justify-evenly items-center flex-col lg:flex-row gap-6  py-14">
          <div className="w-full md:w-1/2">
            <div className="card bg-base-100 shadow-xl max-w-lg my-8">
              <div className="card-body">
                <UpdateProfile></UpdateProfile>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl max-w-lg my-8">
              <div className="card-body">
                <Elements stripe={stripePromise}>
                  <CheckoutForm orderId={orderData?._id} />
                </Elements>
              </div>
            </div>
          </div>
          <div>
            <div className="card max-w-full bg-base-100 shadow-xl mx-6 lg:mx-0">
              <figure className="px-10 pt-10">
                <img
                  src={orderData?.product_id?.img}
                  alt=""
                  className="md:max-w-sm rounded-lg"
                />
              </figure>
              <div className="card-body items-center">
                <p className="card-title">{orderData?.product_id?.name}</p>
                <div className="py-6">
                  {/* <p>{orderData?.product_id?.description}</p> */}
                  <p>Order Id: {orderData?._id}</p>
                  <p>Price: {orderData?.product_id?.price}</p>
                  <p>Order Quantity: {orderData?.order_qnt}</p>
                  <p>Bill: {orderData?.order_bill}</p>
                  <p className="btn btn-error btn-sm">
                    {orderData?.order_status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
