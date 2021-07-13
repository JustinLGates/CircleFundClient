import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import CardHeader from "./SmallElements/CardHeader";

const TicketCard = ({ data }) => {
  return (
    <Fragment>
      <div className="ticket-card my-2">
        <Link to={`/project/${data.projectId}/ticket/${data.id}`}>
          <div className="col-12 p-0">
            <div className="p-2 outline">
              <div className="d-flex justify-content-between ">
                <div>
                  <div className="d-flex flex-column justify-content-between text-left">
                    <div className="mb-4">
                      <CardHeader text={"Name: " + data.testName} />
                    </div>
                    <h5 className="text-dark">Feature: {data.relatedFeature} </h5>
                  </div>
                </div>
                <div>
                  <div className="d-flex flex-column text-dark justify-content-between">
                    <div className="d-flex text-dark justify-content-between">
                      <label className="mr-">Platform: {data.platform}</label>
                      <label>Test number: {data.testNumber}</label>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="text-dark">Priority {data.priorityLevel}</label>
                      <label className="">
                        <i className={data.priorityLevel === "High" ? "fas fa-angle-double-up text-danger" : data.priorityLevel === "Medium" ? "fas fa-angle-up text-danger " : data.priorityLevel === "Undetermined" ? "fas fa-minus text-warning" : data.priorityLevel === "Low" ? "fas fa-angle-down text-success" : "fas fa-angle-double-down text-success"}></i>
                      </label>
                    </div>
                    <label className="text-dark"> Assigned To: {data.assignedTo}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default TicketCard;
