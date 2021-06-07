import React, { Fragment, useState } from "react";
import { api } from "../axios";
import SecondaryHeader from "./SmallElements/SecondaryHeader";
import Button from "./SmallElements/Button/Button";
import LabeledInput from "./Composites/LabeledInput";

const NewProjectForm = ({ handleCreateProject }) => {
  const [projectName, setProjectName] = useState("");
  const [testingIOS, setTestingIos] = useState(true);
  const [testingAndroid, setTestingAndroid] = useState(true);
  const [testingWeb, setTestingWeb] = useState(true);


  let formData = {};

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    formData = {
      name: projectName,
      testingIos: testingIOS,
      testingAndroid: testingAndroid,
      testingWeb: testingWeb,
    };
    try {
      let res = await api.post("/project", formData);
      res.data.role = "owner"
      handleCreateProject(res.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className="col-12 pt-5 m-auto">
        <div className="card shadow p-4">
          <SecondaryHeader text={"Start A New Project"} />
          <form className="p-3" action="">
            <LabeledInput labelText="Project Name" inputPlaceholder="Project Patato Salad" onChange={(e) => setProjectName(e.target.value)} />

            <div className="form-element-container d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <label className="switch-label">Testing iOS</label>
                <div className="d-inline-flex">
                  <label class="switch">
                    <input name="testios" type="checkbox" defaultChecked={true} onChange={(e) => setTestingIos(e.target.checked)} />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-element-container d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <label className="switch-label">Testing Android</label>
                <div className="d-inline-flex">
                  <label class="switch">
                    <input name="testios" type="checkbox" defaultChecked={true} onChange={(e) => setTestingAndroid(e.target.checked)} />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-element-container d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <label className="switch-label">Testing Web</label>
                <div className="d-inline-flex">
                  <label class="switch">
                    <input name="testios" type="checkbox" defaultChecked={true} onChange={(e) => setTestingWeb(e.target.checked)} />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>


            <br />
            <div className="p-4">
              <Button disabled={!testingAndroid && !testingIOS && !testingWeb || !projectName.length > 0} text={"CREATE PROJECT"} onclick={handleSubmitForm} />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProjectForm;
