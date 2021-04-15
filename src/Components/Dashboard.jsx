import React, { useState } from "react";
import NewProjectForm from "./NewProjectForm";

const Dashboard = (props) => {
  return (
    <div className="row">
      <div className="col-12">
        <h1>Welcome to your Dashboard {props.userName} </h1>
        <br />
      </div>
      <div className="col-12">
        <div className="row d-flex">
          {/* // TODO display list of users projects */}
        </div>
        <NewProjectForm />
      </div>
    </div>
  );
};

export default Dashboard;
