import React from "react";
import { Link } from "react-router-dom";

const PdCard = ({ pd }) => {
  return (
    <div className="card card-compact max-w-sm mx-4 md:mx-4 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={pd.img} alt={pd.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{pd.name}</h2>
        <p>Price: ${pd.price}</p>
        <div className="card-actions justify-end">
          <Link to={`/pd-detail/${pd?._id}`} className="btn btn-success">
            See Product Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PdCard;
