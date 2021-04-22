import React, { Fragment, useState } from "react";
import { api } from "../axios";
import SecondaryHeader from "./SmallElements/SecondaryHeader";
import Button from "./SmallElements/Button";
import LabeledInput from "./Composites/LabeledInput";

const NewProjectForm = () => {
  const [projectName, setProjectName] = useState("");

  let formData = {};

  const handleSubmitForm = async (e) => {
    formData = {
      name: projectName,
    };
    try {
      let res = await api.post("/project", formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className="col-12 m-auto">
        <div className="card shadow p-4">
          <SecondaryHeader text={"Start A New Project"} />
          <form className="p-3" action="">
            <LabeledInput labelText="Project Name" inputPlaceholder="Project Patato Salad" onChange={(e) => setProjectName(e.target.value)} />
            <br />
            <div className="p-4">
              <Button text={"CREATE PROJECT"} onclick={handleSubmitForm} />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProjectForm;
