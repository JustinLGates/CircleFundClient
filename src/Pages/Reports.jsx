import React, { useState } from "react";
import SideNavDrawer from "../Components/SideNavDrawer"
import { useParams } from "react-router-dom"
import { Doughnut } from "react-chartjs-2"
const Reports = () => {
  const { projectId } = useParams();

  const reportLinks = [
    { link: `/projects/${projectId}`, text: "Project", icon: "fas fa-arrow-circle-left" },
    { link: `/projects/${projectId}`, text: "Project", icon: "fa fa-book" },
    { link: `/projects/${projectId}`, text: "Project", icon: "fa fa-book" }
  ]
  const data = {
    labels: [
      'new',
      'Complete',
      'In Progress',
      'Blocked',
      'Unable',
      'Invalid'
    ],
    datasets: [{
      label: 'TotalTestCases',
      data: [300, 50, 100, 30, 19, 10],
      backgroundColor: [
        'rgb(102, 161, 255)',
        'rgb(125, 232, 125)',
        'rgb(151, 240, 226)',
        'rgb(252, 255, 171)',
        'rgb(255, 143, 94)',
        'rgb(255, 99, 99)'
      ],
      hoverOffset: 4
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
  };

  const gernerateReport = (platforms) => {

  }

  return (
    <div className="row">
      <div className="col-12 d-flex">

        <SideNavDrawer links={reportLinks} />

        <div className="p-4">
          <div>
            <h2>Reports</h2>

            <button onClick={() => gernerateReport}>Gernerate Report</button>

            <Doughnut data={data} config={config} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Reports;