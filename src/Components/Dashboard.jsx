import React, { useState, Props } from "react";

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
    </div>
  );
};

export default Dashboard;
