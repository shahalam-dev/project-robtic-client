import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";

const CartPage = () => {
  const [cartId, setCartId] = useState("");
  const userId = localStorage.getItem("user_id");

  const {
    isLoading,
    data: cart,
    refetch,
    errors,
  } = useQuery(
    "cartData",
    async () =>
      await axios.get(`https://robtic.herokuapp.com/cart?uid=${userId}`)
  );
  console.log(cart);

  console.log(cart);
  const handleDeleteOrder = async () => {
    const orderId = cart[cartId]?._id;
    const delReq = {
      uid: userId,
      id: orderId,
    };
    if (orderId) {
      const data = await axios.post(
        `https://robtic.herokuapp.com/delete-order`,
        delReq
      );
      console.log(data);
      refetch();
    }
  };

  console.log(errors);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="py-5 mt-8 text-center">
        <h2 className="text-2xl font-bold">Order Summary</h2>
      </div>
      <div className="overflow-x-auto my-12">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((order, i) => (
                <tr key={order?._id}>
                  <th>{i + 1}</th>
                  <td>{order.product_id.name}</td>
                  <td>{order?.order_qnt}</td>
                  <td>
                    <span className="btn btn-xs btn-success">
                      {order?.order_status}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      {order?.order_status === "unpaid" && (
                        <label
                          htmlFor="confirmation-modal"
                          className="btn btn-xs btn-error"
                          onClick={() => setCartId(i)}
                        >
                          Cancel
                        </label>
                      )}
                      {order?.order_status === "unpaid" && (
                        <Link
                          to={`/payment/${cart[i]?._id}`}
                          className="btn btn-xs btn-success"
                        >
                          Make Payment
                        </Link>
                      )}
                      {order?.order_status === "paid" && (
                        <label className="btn btn-xs btn-info">Paid</label>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Modal modal={"confirmation-modal"}>
          <h3 className="text-lg font-bold">Are You Sure?</h3>
          <div className="py-4">
            <div className="mt-6 flex justify-center">
              <label
                className="btn btn-accent btn-wide"
                onClick={handleDeleteOrder}
                htmlFor="confirmation-modal"
              >
                Yes
              </label>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CartPage;
