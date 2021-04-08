import React, { useState } from "react";
import NewProjectForm from "./NewProjectForm";

const Dashboard = (props) => {
  const [profileData] = useState();
  return (
    <div className="row">
      <div className="col-12">
        <h1>Welcome to your Dashboard </h1>
        <br />
        <h3>{props.ProfileData.Name}</h3>
        <img src={props.ProfileData.LogoUrl} alt="" />
      </div>
      <div className="col-12 py-3 text-right px-5">
        <button className="btn btn-primary">New Project +</button>
      </div>
      <div className="col-12">
        <div className="row d-flex">
          <div className="col-4 ">
            <div className="shadow p-2">
              <h4>Project Name</h4>
            </div>
          </div>
          <div className="col-4 ">
            <div className="shadow p-2">
              <h4>Project Name</h4>
            </div>
          </div>
          <div className="col-4 ">
            <div className="shadow p-2">
              <h4>Project Name</h4>
            </div>
          </div>
        </div>
        <NewProjectForm />
      </div>
    </div>
  );
};

export default Dashboard;
