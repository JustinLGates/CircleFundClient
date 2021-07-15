import React from "react";
import SideNavDrawer from "../Components/SideNavDrawer"
import { useParams } from "react-router-dom"

const TestSuites = () => {
  const { projectId } = useParams();
  const reportLinks = [
    { link: `/projects/${projectId}`, text: "Project", icon: "fas fa-arrow-circle-left " },
    { link: `/project/${projectId}/new/testSuite`, text: "CREATE TEST SUITE", icon: "fa fa-plus-circle" },
  ]
  return (
    <div className="row">
      <div className="col-12 d-flex">

        <SideNavDrawer links={reportLinks} />

        <div className="p-4"><h1>Test Suite</h1></div>
        <p>No new suites create a test suite to get started.</p>
      </div>
    </div>
  );
};

export default TestSuites;