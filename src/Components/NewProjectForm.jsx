import React, { Fragment, useState } from "react";
import { api } from "../axios";

const NewProjectForm = () => {
  const [projectName, setProjectName] = useState("");

  let formData = {};

  const handleSubmitForm = async () => {
    // setLoading(true);a
    formData = {
      projectName: projectName,
    };
    try {
      let res = await api.post("projects", formData);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (event) => {
    let targetValue = event.target.value;
    switch (event.target.name) {
      case "projectName":
        setProjectName(targetValue);
        break;
      default:
        break;
    }
  };
  return (
    <Fragment>
      <div className="row py-5">
        <div className="col-12 col-lg-8 m-auto">
          <div className="card shadow p-2">
            <h2 className="p-2">Start a new Project</h2>
            <form className="p-3" action="">
              <label className="p-0 m-0 pl-1 pt-2">Project name</label>
              <input
                className="w-100 p-2 mb-2"
                name="projectName"
                type="text"
                placeholder="Test Zen "
                onChange={handleFormChange}
              />
              <button
                className="btn btn-primary w-100"
                onClick={handleSubmitForm}
              >
                CREATE PROJECT
                </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProjectForm;
