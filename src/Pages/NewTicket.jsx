import React, { useState } from "react";
import SideNavDrawer from "../Components/SideNavDrawer"
import { useParams } from "react-router-dom"
import { api } from "../axios";
import LabeledInput from "../Components/Composites/LabeledInput"
import Button from "../Components/SmallElements/Button/Button"
import Label from '../Components/SmallElements/Label'

const NewTicket = () => {

  const { projectId } = useParams();
  const reportLinks = [{ link: `/projects/${projectId}`, text: "Project", icon: "fas fa-arrow-circle-left" }]

  const [testName, setTestName] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("Undetermined");
  const [assignedTo, setAssignedTo] = useState("");
  const [setupStep, setSetupStep] = useState("");
  const [setupArray, setSetupArray] = useState([]);
  const [steps, setSteps] = useState("");
  const [stepsArray, setStepsArray] = useState([]);
  const [verifications, setVerifications] = useState("");
  const [verificationsArray, setVerificationsArray] = useState([]);
  const [automate, setAutomate] = useState(true);
  const [relatedFeature, setRelatedFeature] = useState("");
  const [jiraTicket, setJiraTicket] = useState("");
  const [designLink, setDesignLink] = useState("");

  const [notes, setNotes] = useState("");

  let formData = {};

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    if (setupStep.length > 0) {
      setupArray.push(setupStep)
    }

    if (steps.length > 0) {
      stepsArray.push(steps)
    }

    if (verifications.length > 0) {
      verificationsArray.push(verifications)
    }

    formData = {
      testName: testName,
      priorityLevel: priorityLevel,
      assignedTo: assignedTo,
      setup: setupArray.toString(),
      steps: stepsArray.toString(),
      verifications: verificationsArray.toString(),
      status: "new",
      ticketNumber: 1,
      automate: automate,
      relatedFeature: relatedFeature,
      jiraTicket: jiraTicket,
      designLink: designLink,
      notes: notes,
    };
    console.log(formData)
    try {
      let res = await api.post(`project/${projectId}/ticket`, formData);
      console.log("create ticket response" + res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addSetupStep = (e) => {
    e.preventDefault()
    setSetupArray([...setupArray, setupStep])
    setSetupStep("")
  }

  const removeSetupStep = (e, index) => {
    e.preventDefault()
    let arr = setupArray.filter((item, i) => i !== index)
    setSetupArray(arr)
  }

  const addStep = (e) => {
    e.preventDefault()
    setStepsArray([...stepsArray, steps])
    setSteps("")
  }

  const removeStep = (e, index) => {
    e.preventDefault()
    let arr = stepsArray.filter((item, i) => i !== index)
    setStepsArray(arr)
  }

  const addVerification = (e) => {
    e.preventDefault()
    setVerificationsArray([...verificationsArray, verifications])
    setVerifications("")
  }

  const removeVerification = (e, index) => {
    e.preventDefault()
    let arr = verificationsArray.filter((item, i) => i !== index)
    setVerificationsArray(arr)
  }

  return (

    <div className="row">
      <div className="col-12 d-flex">

        <SideNavDrawer links={reportLinks} />



        <form className="p-5 flex-grow-1 m-auto">
          <LabeledInput name={testName} labelText={"Test Name"} onChange={(e) => setTestName(e.target.value)} />

          <div className="d-flex">
            <div className="flex-grow-1">
              <LabeledInput className="pr-2"
                inputValue={setupStep}
                name={"setup Step"}
                labelText="Setup"
                onChange={(e) => setSetupStep(e.target.value)} />
            </div>

            <span className="p-1 mr-1">
              <button title="Add setup step" className=" btn btn-success mr-4" onClick={addSetupStep}><i className="fa fa-plus"></i></button>
            </span>
          </div>
          {
            setupArray.map((item, index) =>
              <div key={index} className="d-flex">
                <div className="flex-grow-1 labeled-input pl-5">
                  <Label text={`${index + 1}. ${item}`}></Label>
                </div>

                <span className="p-1 mr-1">
                  <button title="Add setup step" className=" btn btn-danger mr-4" onClick={e => removeSetupStep(e, index)} ><i className="fa fa-minus"></i></button>
                </span>
              </div>
            )
          }
          {setupStep.length > 0 ? (
            <div className="labeled-input py- pl-5">
              <Label text={`${setupArray.length + 1}. ${setupStep}`} />
            </div>)
            : (<></>)
          }

          <div className="d-flex">
            <div className="flex-grow-1">
              <LabeledInput className="pr-2"
                inputValue={steps}
                name={"steps"}
                labelText="Steps"
                onChange={(e) => setSteps(e.target.value)} />
            </div>

            <span className="p-1 mr-1">
              <button title="Add step" className="btn btn-success mr-4" onClick={addStep}><i className="fa fa-plus"></i></button>
            </span>
          </div>
          {
            stepsArray.map((item, index) =>
              <div key={index} className="d-flex">
                <div className="flex-grow-1 labeled-input pl-5">
                  <Label text={`${index + 1}. ${item}`}></Label>
                </div>
                <span className="p-1 mr-1">
                  <button title="Remove step" className=" btn btn-danger mr-4" onClick={e => removeStep(e, index)} ><i className="fa fa-minus"></i></button>
                </span>
              </div>
            )
          }
          {steps.length > 0 ? (
            <div className="labeled-input py- pl-5">
              <Label text={`${stepsArray.length + 1}. ${steps}`} />
            </div>)
            : (<></>)
          }

          <div className="d-flex">
            <div className="flex-grow-1">
              <LabeledInput className="pr-2"
                inputValue={verifications}
                name={"verification"}
                labelText="Verification"
                onChange={(e) => setVerifications(e.target.value)} />
            </div>

            <span className="p-1 mr-1">
              <button title="Add setup step" className=" btn btn-success mr-4" onClick={addVerification}><i className="fa fa-plus"></i></button>
            </span>
          </div>
          {
            verificationsArray.map((item, index) =>
              <div key={index} className="d-flex">
                <div className="flex-grow-1 labeled-input pl-5">
                  <Label text={`${index + 1}. ${item}`}></Label>
                </div>
                <span className="p-1 mr-1">
                  <button title="Add setup step" className=" btn btn-danger mr-4" onClick={e => removeVerification(e, index)} ><i className="fa fa-minus"></i></button>
                </span>
              </div>
            )
          }
          {verifications.length > 0 ? (
            <div className="labeled-input py- pl-5">
              <Label text={`${verificationsArray.length + 1}. ${verifications}`} />
            </div>)
            : (<></>)
          }

          <LabeledInput name={jiraTicket} labelText={"Jira ticket"} onChange={(e) => setJiraTicket(e.target.value)} />
          <LabeledInput name={designLink} labelText={"Design Link"} onChange={(e) => setJiraTicket(e.target.value)} />
          <LabeledInput name={relatedFeature} labelText={"Related Feature"} onChange={(e) => setRelatedFeature(e.target.value)} />
          <LabeledInput name={notes} labelText={"Notes"} onChange={(e) => setNotes(e.target.value)} />


          <div className="form-element-container d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <label className="switch-label">Automate</label>
              <div className="d-inline-flex">
                <label class="switch">
                  <input name="chk" type="checkbox" defaultChecked={true} onChange={(e) => setAutomate(e.target.checked)} />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>
          {
            automate ? (
              <div>
                <div className="form-element-container">
                  <Label text={"Automation Priority"} />
                  <select onChange={(e) => setPriorityLevel(e.target.value)} class="form-select" aria-label="Select automation priority">
                    <option default >Undetermined</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="Backlog">Backlog</option>
                  </select>
                </div>
                <LabeledInput name={assignedTo} labelText={"Assign to"} onChange={(e) => setAssignedTo(e.target.value)} />
              </div>
            ) : (<></>)
          }
          <div className="px-5 mx-5 pt-3">
            <div class="modal-footer">
              <Button text={"Create"} onclick={handleSubmitForm} />
            </div>
          </div>
        </form>


      </div>
    </div>
  );
};

export default NewTicket;