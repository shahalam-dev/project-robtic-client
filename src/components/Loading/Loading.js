import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-80">
      {/* <progress className="progress w-1/4"></progress> */}
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
