import React from "react";

const Banner = () => {
  return (
    <div
      className="hero min-h-[500px]"
      style={{
        backgroundImage: `url("https://i.ibb.co/tbQ5Nzr/Industrial-robots.png")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to Robtic</h1>
          <p className="mb-5">
            World leading robotic parts manufacturing company.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
