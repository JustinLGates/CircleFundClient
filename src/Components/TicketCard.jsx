import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import CardHeader from "./SmallElements/CardHeader";

const TicketCard = ({ data }) => {
  return (
    <Fragment>
      <div className="ticket-card my-2">
        <Link to={`/project/${data.projectId}/ticket/${data.id}`}>
          <div className="col-12">
            <div className="p-2 outline">
              <div className="d-flex align-items-center justify-content-between">
                <CardHeader text={data.testName} />
                <div className="d-flex flex-column">
                  <div>
                    <label className="px-4">Platform: {data.platform}</label>
                    <label>Test number: {data.testNumber}</label>
                  </div>
                  <div>
                    <label className="d-inline">{data.priorityLevel}</label>
                    <span className="px-3">
                      <i class={data.priorityLevel === "High" ? "fas fa-angle-double-up text-danger" : data.priorityLevel === "Medium" ? "fas fa-angle-up text-danger " : data.priorityLevel === "Undetermined" ? "fas fa-minus text-warning" : data.priorityLevel === "Low" ? "fas fa-angle-down text-success" : "fas fa-angle-double-down text-success"}></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">

                <label>{data.relatedFeature} </label>
                <label>{data.assignedTo}</label>
              </div>
            </div>

          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default TicketCard;
