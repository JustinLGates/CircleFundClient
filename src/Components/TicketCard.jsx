import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import CardHeader from "./SmallElements/CardHeader";

const TicketCard = ({ data }) => {
  return (
    <Fragment>
      <Link to={`/project/${data.projectId}/ticket/${data.ticketId}`}>
        <div className="col-12">
          <div className="p-2 underline highlight-on-hover">
            <CardHeader text={data.testName} />
            <p>{data.priority || "medium"}</p>
            <p>{data.automate || "no automation status / false"} </p>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default TicketCard;
