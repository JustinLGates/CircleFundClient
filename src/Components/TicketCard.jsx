import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import CardHeader from "./SmallElements/CardHeader";

const TicketCard = ({ data }) => {
  return (
    <Fragment>
      <Link to={`/project/${data.projectId}/ticket/${data.ticketId}`}>
        <div className="col-12">
          <div className="p-2 underline highlight-on-hover">
            <div className="d-flex align-items-center justify-content-between">
              <CardHeader text={data.testName} />
              <div>

                <label className="d-inline">{data.priorityLevel}</label>
                <span className="px-3">
                  <i class={data.priorityLevel === "High" ? "fas fa-angle-double-up text-danger" : data.priorityLevel === "Medium" ? "fas fa-angle-up text-danger " : data.priorityLevel === "Undetermined" ? "fas fa-minus text-warning" : data.priorityLevel === "Low" ? "fas fa-angle-down text-success" : "fas fa-angle-double-down text-success"}></i>
                </span>
              </div>
            </div>
            <p>{data.automate ? "Can be automated" : "Manual only"} </p>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default TicketCard;
