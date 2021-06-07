import React from "react";
import SideNavDrawer from "../Components/SideNavDrawer"
import { useParams } from "react-router-dom"

const TestSuites = () => {
  const { projectId } = useParams();
  const reportLinks = [
    { link: `/projects/${projectId}`, text: "Project", icon: "fas fa-arrow-circle-left " },
    { link: `/projects/${projectId}`, text: "Project", icon: "fa fa-book " },
    { link: `/projects/${projectId}`, text: "Project", icon: "fa fa-book " }
  ]
  return (
    <div className="row">
      <div className="col-12 d-flex">

        <SideNavDrawer links={reportLinks} />

        <div className="p-4"><h1>HELLO Test Suite</h1></div>
      </div>
    </div>
  );
};

export default TestSuites;