import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { api } from "../axios";
import NewProjectForm from "./NewProjectForm";

const Dashboard = ({ user }) => {

  const [projects, setProjects] = useState([])
  useEffect(() => {
    getProjects();
  }, [])
  useEffect(() => {
  }, [projects])
  const getProjects = async () => {
    try {
      const response = await api.get('project');
      console.log(response.data)
      setProjects(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <fragment>

      <div className="row pt-5 d-flex justify-content-around">
        <div className="col-12 col-lg-7">
          <div className="row">
            <div className="col-12 shadow p-4">
              <div className="p-4">
                <div className="d-flex justify-content-between">
                  <h2>Your Projects</h2>
                  <h2>Role</h2>
                </div>
                <hr />
              </div>
              {
                projects && projects.map(project => {
                  return (
                    <div className="row">
                      <div className="col-12 px-4" key={project.projectId}>
                        <Link to={"projects/" + project.projectId} className="d-flex justify-content-between align-items-center highlight-on-hove">
                          <h4 className="p-1 m-0 d-inline text-dark">{project.name}</h4>
                          <h3 className="p-1 m-0 text-dark ">{project.role}</h3>
                        </Link>
                      </div>
                    </div>
                  )

                })
              }
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <NewProjectForm />
        </div>

      </div>
    </fragment>
  )
};

export default Dashboard;
