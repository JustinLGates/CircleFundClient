import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const TicketCard = ({ data }) => {
  return (
    <Fragment>
      <Link to={`/project/${data.projectId}/ticket/${data.ticketId}`}>
        <div className="col-4">
          <div className="p-3 shadow">
            <h4>{data.testName}</h4>
            <p>{data.priority || "Undetermend"}</p>
            <p>{data.automate || "asd"} </p>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default TicketCard;
