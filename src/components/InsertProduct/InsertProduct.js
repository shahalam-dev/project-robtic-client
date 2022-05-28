import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useImgUpload from "../../hooks/useImgUpload";

const InsertProduct = () => {
  const storeImg = useImgUpload();
  const userId = localStorage.getItem("user_id");
  const userRole = localStorage.getItem("user_role");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formData) => {
    const {
      title: name,
      description,
      pdImg,
      minQnt: min_order,
      maxQnt: max_order,
      price,
    } = formData;
    // console.log(name, description, minQnt, maxQnt, price);
    const img = await storeImg(pdImg[0]);
    console.log(img);
    const pd = {
      name,
      description,
      img,
      min_order,
      max_order,
      price,
    };

    const toastId = toast.loading("Please wait...");

    const data = await axios.post(
      `https://robtic.herokuapp.com/insert-product?uid=${userId}&role=${userRole}`,
      pd
    );

    toast.update(toastId, {
      render: "Payment Successful!",
      type: "success",
      isLoading: false,
    });
    setTimeout(() => {
      toast.dismiss(toastId.current);
    }, 4000);

    reset({
      title: "",
      description: "",
      pdImg: "",
      minQnt: "",
      maxQnt: "",
      price: "",
    });
  };

  //   console.log(watch("name"));
  console.log(errors);

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-full lg:w-1/2">
        <div className="py-5 text-center">
          <h2 className="text-4xl">Add Product</h2>
        </div>
        <div className="card-body items-center text-center">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Title</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("title", { required: true, minLength: 10 })}
              />
              <label className="label">
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product description</span>
              </label>
              <textarea
                placeholder="Type here"
                className="textarea textarea-bordered w-full"
                {...register("description", {
                  required: true,
                  minLength: 20,
                  maxLength: 400,
                })}
              />
              <label className="label">
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Image</span>
              </label>
              <input
                type="file"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("pdImg", { required: true })}
              />
              <label className="label">
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Minimum order quantity</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("minQnt", { required: true, pattern: /^[0-9]/ })}
              />
              <label className="label">
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Maximum order quantity</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("maxQnt", { required: true, pattern: /^[0-9]/ })}
              />
              <label className="label">
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Price</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("price", { required: true, pattern: /^[0-9]/ })}
              />
              <label className="label">
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
            </div>
            <button className="btn btn-secondary btn-wide">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InsertProduct;
