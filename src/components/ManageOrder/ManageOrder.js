import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const ManageOrder = () => {
  const userId = localStorage.getItem("user_id");
  const userRole = localStorage.getItem("user_role");
  const url = `https://robtic.herokuapp.com/all-order?uid=${userId}`;

  const {
    isLoading,
    data: orders,
    refetch,
  } = useQuery("fetch-users", async () => await axios.get(url));

  const handleShipping = async (id) => {
    const toastId = toast.loading("Please wait...");

    await axios.post(
      `https://robtic.herokuapp.com/ship?uid=${userId}&ship=${id}&role=${userRole}`
    );

    toast.update(toastId, {
      render: "Order shipped Successfully!",
      type: "success",
      isLoading: false,
    });
    refetch();
    setTimeout(() => {
      toast.dismiss(toastId.current);
    }, 4000);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="py-5 text-center">
        <h2 className="text-4xl">All Order</h2>
      </div>
      <div className="overflow-x-auto my-12">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Order Id</th>
              <th>Customer Id</th>
              <th>Order Status</th>
              <th>Bill</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, i) => (
                <tr key={order?._id}>
                  <th>{i + 1}</th>
                  <td>{order?.product_id?.name}</td>
                  <td>{order?._id}</td>
                  <td>{order?.customer_uid}</td>
                  <td>{order?.order_status}</td>
                  <td>${order?.order_bill}</td>
                  <td>
                    {order?.order_status !== "shipped" &&
                      order?.order_status === "paid" && (
                        <label
                          className="btn btn-xs"
                          onClick={() => handleShipping(order?._id)}
                        >
                          Ship
                        </label>
                      )}
                    {order?.order_status === "shipped" && (
                      <label className="btn btn-xs btn-success">Shipped</label>
                    )}
                    {order?.order_status === "unpaid" && (
                      <label className="btn btn-xs btn-accent">Unpaid</label>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageOrder;
