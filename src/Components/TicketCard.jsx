import React, { Fragment } from "react";

const TicketCard = ({ data }) => {
  return (
    <Fragment>
      <div className="col-4">
        <div className="p-3 shadow">
          <h4>{data.testName}</h4>
          <p>{data.priority || "Undetermend"}</p>
          <p>{data.automate || "asd"} </p>
        </div>
      </div>
    </Fragment>
  );
};

export default TicketCard;
