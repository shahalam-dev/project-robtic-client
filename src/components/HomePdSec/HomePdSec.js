import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PdCard from "../PdCard/PdCard";

const HomePdSec = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`https://robtic.herokuapp.com/home-product`)
      .then((res) => setProducts(res));
  }, []);
  return (
    <div className="my-40">
      <h2 className="text-4xl text-center my-8">Products</h2>
      <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-30">
        {products &&
          products.map((pd) => <PdCard pd={pd} key={pd._id}></PdCard>)}
      </div>
      <div className="my-8 flex justify-center items-center">
        <Link to="/all-product" className="btn btn-success">
          See all products
        </Link>
      </div>
    </div>
  );
};

export default HomePdSec;
