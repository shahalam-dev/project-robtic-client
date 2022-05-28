import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const ManageUser = () => {
  const [adminId, setAdminId] = useState("");
  const userId = localStorage.getItem("user_id");
  const userRole = localStorage.getItem("user_role");
  // const [users, setUsers] = useState([]);

  const url = `https://robtic.herokuapp.com/all-user?uid=${userId}`;

  const {
    isLoading,
    data: users,
    refetch,
  } = useQuery("fetch-users", async () => await axios.get(url));

  // useEffect(() => {
  //   axios.get(url).then((data) => setUsers(data));
  // }, [url]);

  const handleMakeAdmin = async () => {
    const toastId = toast.loading("Please wait...");

    await axios.post(
      `https://robtic.herokuapp.com/make-admin?uid=${userId}&makeAdmin=${adminId}&role=${userRole}`
    );

    toast.update(toastId, {
      render: "User made admin Successfully!",
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
        <h2 className="text-4xl">All User</h2>
      </div>
      <div className="overflow-x-auto my-12">
        <table className="table sm:table-compact md:table-normal w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>User Id</th>
              <th>User Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, i) => (
                <tr key={user?._id}>
                  <th>{i + 1}</th>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.uid}</td>
                  <td>{user?.role}</td>
                  <td>
                    {user?.role !== "admin" && (
                      <label
                        htmlFor="confirmation-modal"
                        className="btn btn-xs"
                        onClick={() => setAdminId(user?._id)}
                      >
                        Make Admin
                      </label>
                    )}
                    {user?.role === "admin" && (
                      <label className="btn btn-xs btn-accent">Admin</label>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <input
          type="checkbox"
          id="confirmation-modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="confirmation-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">Are You Sure?</h3>
            <div className="py-4">
              <div className="mt-6 flex justify-center">
                <button
                  className="btn btn-accent btn-wide"
                  onClick={handleMakeAdmin}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUser;
