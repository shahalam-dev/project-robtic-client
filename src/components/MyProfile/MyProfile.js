import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";
import UpdateProfile from "../UpdateProfile/UpdateProfile";

const MyProfile = () => {
  const userId = localStorage.getItem("user_id");
  const profileId = localStorage.getItem("profile_id");

  //============================
  const {
    isLoading,
    data: userData,
    refetch,
  } = useQuery(
    "fetch-user-data",
    async () =>
      await axios.get(`https://robtic.herokuapp.com/user-data?uid=${userId}`)
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="card bg-base-100">
        <h2 className="my-4 text-2xl font-bold lg:text-4xl text-center">
          My Profile
        </h2>
        <figure className="px-10 pt-10">
          <img
            src="https://i.ibb.co/FmjQqzy/profile.jpg"
            alt="Shoes"
            className="mask mask-circle max-w-[150px] max-h-[150px]"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{userData[0]?.name}</h2>
          <p>Email: {userData[0]?.email}</p>
          <p>
            Phone:{" "}
            {userData[0]?.phone
              ? `${userData[0]?.phone}`
              : "No Phone Number added"}
          </p>
          <p>
            address:{" "}
            {userData[0]?.address
              ? `${userData[0]?.address}`
              : "No Address added"}
          </p>
          <div className="card-actions">
            <label
              htmlFor="confirmation-modal"
              className="btn btn-success  mt-8"
            >
              Update Profile
            </label>
          </div>
        </div>
      </div>
      <Modal modal={"confirmation-modal"}>
        <UpdateProfile></UpdateProfile>
      </Modal>
    </>
  );
};

export default MyProfile;
