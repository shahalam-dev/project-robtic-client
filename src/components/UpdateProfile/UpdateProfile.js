import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
const UpdateProfile = () => {
  const userId = localStorage.getItem("user_id");
  const profileId = localStorage.getItem("profile_id");

  //============================
  const {
    isLoading,
    data: userData,
    refetch,
  } = useQuery(
    "fetch-user",
    async () =>
      await axios.get(`https://robtic.herokuapp.com/user-data?uid=${userId}`)
  );

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setPhone(userData && userData[0]?.phone);
    setAddress(userData && userData[0]?.address);
  }, [userData]);

  //============================

  const uPhone = useRef();
  const uAddress = useRef();

  //============================

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_phone = uPhone.current.value;
    const user_address = uAddress.current.value;
    const userFormData = {
      user_phone,
      user_address,
    };
    const toastId = toast.loading("Please wait...");

    // console.log(userFormData);
    await axios.post(
      `https://robtic.herokuapp.com/update-user-data?uid=${userId}&id=${profileId}`,
      userFormData
    );

    await refetch();
    toast.update(toastId, {
      render: "Profile successfully updated.",
      type: "success",
      isLoading: false,
    });
    setTimeout(() => {
      toast.dismiss(toastId.current);
    }, 4000);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <form>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input
            type="text"
            disabled
            value={userData && userData[0]?.name}
            placeholder="Your Name"
            class="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <input
            type="email"
            disabled
            placeholder="Your Name"
            value={userData && userData[0]?.email}
            class="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Your Phone Number</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your Name"
            class="input input-bordered w-full"
            ref={uPhone}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Your Address</span>
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your Name"
            class="input input-bordered w-full "
            ref={uAddress}
          />
        </div>
        <div className="flex justify-end mt-10">
          <button className="btn btn-success btn-wide" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateProfile;
