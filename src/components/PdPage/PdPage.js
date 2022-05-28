import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const PdPage = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const { isLoading, data: product } = useQuery(
    "productDetail",
    async () =>
      await axios.get(`https://robtic.herokuapp.com/find-product?id=${id}`)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (formData) => {
    const { qnt } = formData;
    const { uid } = userId;
    const pdId = product._id;
    const bill = product.price * parseInt(qnt);
    const order = {
      pdId,
      uid,
      qnt,
      bill,
    };
    console.log(
      "added to cart",
      `https://robtic.herokuapp.com/add-to-cart?uid=${userId}`
    );
    const data = await axios.post(
      `https://robtic.herokuapp.com/add-to-cart?uid=${userId}`,
      order
    );
    console.log(data);
    await toast.success("Order added to cart");
    setTimeout(() => {
      navigate("/cart", { replace: true });
    }, 2000);

    reset({ qnt: "" });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="my-20">
      <div className="w-4/6 mx-auto">
        <h2 className="text-4xl text-center">Product Details</h2>
        <div className="card lg:card-side bg-base-100 shadow-xl my-20">
          <figure>
            <img src={product?.img} alt={product?.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title md:text-4xl md:mb-8">{product?.name}</h2>
            <p className="text-2xl">Description :</p>
            <p>{product?.description}</p>
            <p className="text-xl">Order Quantity :</p>
            <p>Minimum Order Quantity: {product?.min_order}</p>
            <p>Maximum Order Quantity: {product?.max_order}</p>
            <p className="text-xl">Price :</p>
            <p>${product?.price}</p>
            <form className="my-6">
              <div className="form-control w-full">
                <label className="input-group">
                  <span>Qnt: </span>
                  <input
                    type="text"
                    placeholder="Quantity"
                    className="input input-bordered"
                    {...register("qnt", {
                      required: true,
                      min: `${product?.min_order}`,
                      max: `${product?.max_order}`,
                      pattern: /^[0-9]/,
                    })}
                  />
                </label>
                <label className="label">
                  {errors.qnt?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      Quantity is required.
                    </span>
                  )}
                  {errors.qnt?.type === "min" && (
                    <span className="label-text-alt text-red-500">
                      Minimum order quantity is {product.min_order}
                    </span>
                  )}
                  {errors.qnt?.type === "max" && (
                    <span className="label-text-alt text-red-500">
                      Maximum order quantity is {product.max_order}
                    </span>
                  )}
                  {errors.qnt?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      Order quantity must be number.
                    </span>
                  )}
                </label>
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit(onSubmit)}
                >
                  Add To Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdPage;
