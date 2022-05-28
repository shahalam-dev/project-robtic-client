import React from "react";
import { useForm } from "react-hook-form";
import useFirebase from "../../hooks/useFirebase";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";

const LogInForm = () => {
  const { handleLogIn, errorMsg } = useFirebase();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const { email, password } = data;
    handleLogIn(email, password);
    reset({ email: "", password: "" });
  };
  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 shadow-xl sm:w-1/1 lg:w-1/3 md:w-1/2">
        <div className="card-body items-center text-center">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Log In into your account.
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
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("email", { required: true, minLength: 8 })}
              />
              <label className="label">
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Password</span>
              </label>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("password", { required: true, minLength: 8 })}
              />
              <label className="label">
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
            </div>
            <button className="btn btn-secondary md:btn-wide">Sign In</button>
          </form>

          <div className="divider">OR</div>
          <GoogleSignIn></GoogleSignIn>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
