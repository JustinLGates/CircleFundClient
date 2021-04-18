import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { api } from "../axios";
import NewProjectForm from "./NewProjectForm";

const Dashboard = ({ userHasProfile, userName }) => {

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

  async function createProfile() {
    try {
      const data = { name: "Justin Gates" }
      const response = await api.post("profile", data);
      console.log("Created Profile response" + response.data)
      setProjects(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  return userHasProfile ? (
    <div className="row">
      <div className="col-12">
        <h1>HELLO, {userName}</h1>
      </div>

      {
        projects && projects.map(project => {
          return (
            <div className="col-4 p-4" key={project.projectId}>

              <Link to={"project/" + project.projectId} className="shadow d-flex justify-content-between align-items-center">
                <h4 className="p-2 d-inline">{project.name}</h4>
              </Link>
            </div>
          )

        })
      }
      <NewProjectForm />
    </div>
  ) : <div>
    <p>NO PROFILE DATA</p>
    <input type="text" name="userName" placeholder="Name" />
    <button onClick={createProfile} className="btn btn-outline-fprimary">Create Profile</button>
  </div>;
};

export default Dashboard;
