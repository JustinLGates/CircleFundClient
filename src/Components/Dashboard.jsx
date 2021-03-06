import React, { useState, useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import { api } from "../axios";
import NewProjectForm from "./NewProjectForm";

const Dashboard = ({ profileData }) => {

  const [projects, setProjects] = useState([])
  useEffect(() => {
    getProjects();
  }, [])
  useEffect(() => {
  }, [projects])
  const getProjects = async () => {
    try {
      const response = await api.get('project');
      console.log("project Data: " + response.data)
      console.log(response.data)
      console.log("profile Data: " + profileData)
      console.log(profileData)
      setProjects(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCreateProject = (project) => {
    setProjects([...projects, project])
  }

  return (
    <Fragment>

      <div className="row pt-5">
        <div className="col-lg-10 col-xl-9 col-12 m-auto">
          <row>

            <div className="col-12 m-auto">
              <div className=" p-4  shadow">
                <div className="d-flex justify-content-between">
                  <h2>Your Projects</h2>
                </div>
                <hr />
                {
                  projects && projects.map(project => {
                    return (
                      <div className="col-10 m-auto" key={project.projectId}>
                        <Link to={"projects/" + project.projectId} className="d-flex justify-content-between align-items-center highlight boxed-2 my-3 p-2">
                          <h4 className="p-1 m-0 text-dark">{project.name}</h4>
                        </Link>
                      </div>
                    )

                  })
                }
              </div>
            </div>
            <NewProjectForm handleCreateProject={handleCreateProject} />
          </row>
        </div>
      </div>
    </Fragment>
  )
};

export default Dashboard;
