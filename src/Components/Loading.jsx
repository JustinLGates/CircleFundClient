import React from "react";
const Loading = () => {
  return (
    <div className=" vh-100 w-100 d-flex justify-content-center flex-column align-items-center ">
      <h2 className="p-3">
        <span className="fa fa-spin p-4">
          <i className="fa fa-spin fas fa-bacon"></i>
        </span>
        Loading
        <span className="fa fa-spin p-4">
          <i className="fa fa-spin fas fa-bacon"></i>
        </span>
      </h2>
      <small>Smells like Bacon.</small>
    </div>
  );
};

export default Loading;
