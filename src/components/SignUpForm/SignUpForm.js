import React from "react";
import { useForm } from "react-hook-form";
import useFirebase from "../../hooks/useFirebase";
import useImgUpload from "../../hooks/useImgUpload";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";

const SignUpForm = () => {
  const { createUserWithEmail, errorMsg } = useFirebase();
  const storeImg = useImgUpload();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const { name, email, photo, password } = data;
    const photoURL = await storeImg(photo[0]);

    await createUserWithEmail(name, email, photoURL, password);
    reset({ name: "", email: "", photo: "", password: "" });
  };

  //   console.log(watch("name"));
  console.log(errors);

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 shadow-xl sm:w-1/1 lg:w-1/3 md:w-1/2">
        <div className="card-body items-center text-center">
          <div className="flex flex-col items-center w-full border-opacity-50">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Create an account.
            </h2>
            {errorMsg && (
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{errorMsg.message}</span>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-md"
                  {...register("name", { required: true, maxLength: 20 })}
                />
                <label className="label">
                  {/* {errors.name && (
                    <span className="label-text-alt">dfdfsdf</span>
                  )} */}
                </label>
              </div>
              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-md"
                  {...register("email", { required: true })}
                />
                <label className="label">
                  {/* <span className="label-text-alt">Alt label</span> */}
                </label>
              </div>
              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text">Upload Your Photo</span>
                </label>
                <input
                  type="file"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-md"
                  {...register("photo", { required: true })}
                />
                <label className="label">
                  {/* <span className="label-text-alt">Alt label</span> */}
                </label>
              </div>
              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text">Your Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-md"
                  {...register("password", { required: true, minLength: 8 })}
                />
                <label className="label">
                  {/* <span className="label-text-alt">Alt label</span> */}
                </label>
              </div>
              <button className="btn btn-secondary md:btn-wide" type="submit">
                Sign Up
              </button>
            </form>
            <div className="divider">OR</div>
            <GoogleSignIn></GoogleSignIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
