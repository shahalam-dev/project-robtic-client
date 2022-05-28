import React from "react";

const Stat = () => {
  return (
    <div class="stats shadow w-full bg-accent flex flex-col xl:flex-row my-8 py-4">
      <div class="stat text-center flex items-center justify-center">
        <img
          src="https://i.ibb.co/tLH8x5b/ico-world.png"
          className="max-w-[50px] max-h-[50px]"
          alt=""
        />
        <div class="stat-title text-white text-xl">
          The World's Leading Robot Store
        </div>
      </div>
      <div class="stat text-center flex items-center justify-center">
        <img
          src="https://i.ibb.co/F04KT8T/ico-satisfaction.png"
          className="max-w-[50px] max-h-[50px]"
          alt=""
        />
        <div class="stat-title text-white text-xl">
          Customers Satisfaction 10/10
        </div>
      </div>
      <div class="stat text-center flex items-center justify-center">
        <img
          src="https://i.ibb.co/HVptJv9/ico-shipping.png"
          className="max-w-[50px] max-h-[50px]"
          alt=""
        />
        <div class="stat-title text-white text-xl">
          Free shipping on orders over USD $ 100.00 *
        </div>
      </div>
    </div>
  );
};

export default Stat;
