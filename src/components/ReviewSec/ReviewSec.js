import axios from "axios";
import React, { useEffect, useState } from "react";

const ReviewSec = () => {
  const [reviews, setReviews] = useState([]);
  console.log(reviews);
  useEffect(() => {
    axios
      .get("https://robtic.herokuapp.com/all-review")
      .then((data) => setReviews(data));
  }, []);
  return (
    <>
      <h3 className="text-4xl font-bold text-center mt-20">All Reviews</h3>
      <div className="carousel w-full my-20">
        {reviews?.map((data, i, arr) => (
          <div id={`slide${i + 1}`} className="carousel-item relative w-full">
            <div class="card w-full bg-neutral text-neutral-content">
              <div class="card-body items-center text-center py-12">
                <p>{data?.review}</p>
                <h2 class="card-title">{data?.user_id.name}</h2>
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a
                    href={`#slide${i - 2 < 1 ? arr.length : i - 2}`}
                    class="btn btn-circle"
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${i + 2 > arr.length ? 1 : i + 2}`}
                    class="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewSec;
