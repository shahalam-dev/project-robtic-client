import axios from "axios";
import React, { useRef } from "react";
import { toast } from "react-toastify";

const AddReview = () => {
  const reviewInput = useRef();
  const userId = localStorage.getItem("user_id");
  const profileId = localStorage.getItem("profile_id");
  const userRole = localStorage.getItem("user_role");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = reviewInput.current.value;
    const toastId = toast.loading("Please wait...");

    console.log(review);
    if (userRole !== "admin") {
      await axios.post(
        `https://robtic.herokuapp.com/add-review?uid=${userId}&id=${profileId}&review=${review}`
      );
    }

    toast.update(toastId, {
      render: "Review successfully added.",
      type: "success",
      isLoading: false,
    });
    setTimeout(() => {
      toast.dismiss(toastId.current);
    }, 4000);
  };
  return (
    <div className="flex justify-center items-center py-8 my-8 w-full">
      <form>
        <div className="form-control w-full lg:max-w-xl">
          <label className="label">
            <span className="label-text">Add Review</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Review"
            ref={reviewInput}
          ></textarea>
        </div>
        <div className="flex justify-end mt-10">
          <button className="btn btn-success btn-wide" onClick={handleSubmit}>
            Post Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
