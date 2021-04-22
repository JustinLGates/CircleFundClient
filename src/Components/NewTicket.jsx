import React, { Fragment, useState } from "react";
import { api } from "../axios";
import LabeledInput from "./Composites/LabeledInput"

const NewTicket = ({ projectId }) => {
  const [testName, setTestName] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [setup, setSetup] = useState("");
  const [steps, setSteps] = useState("");
  const [verifications, setVerifications] = useState("");
  const [automate, setAutomate] = useState(true);
  const [relatedFeature, setRelatedFeature] = useState("");
  const [jiraTicket, setJiraTicket] = useState("");
  const [notes, setNotes] = useState("");


  let formData = {};

  const handleSubmitForm = async (e) => {
    // e.preventDefault()
    formData = {
      testName: testName,
      priorityLevel: priorityLevel,
      assignedTo: assignedTo,
      setup: setup,
      steps: steps,
      verifications: verifications,
      automate: automate,
      relatedFeature: relatedFeature,
      jiraTicket: jiraTicket,
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

  const handleFormChange = (event) => {
    let targetValue = event.target.value;
    switch (event.target.name) {
      case "testName":
        console.log("setting test name to:" + targetValue)
        setTestName(targetValue);
        break;
      case "priorityLevel":
        setPriorityLevel(targetValue);
        break;
      case "assignedTo":
        setAssignedTo(targetValue);
        break;
      case "setup":
        setSetup(targetValue);
        break;
      case "steps":
        setSteps(targetValue);
        break;
      case "verifications":
        setVerifications(targetValue);
        break;
      case "automate":
        setAutomate(targetValue);
        break;
      case "relatedFeature":
        setRelatedFeature(targetValue);
        break;
      case "jiraTicket":
        setJiraTicket(targetValue);
        break;
      case "notes":
        setNotes(targetValue);
        break;
      default:
        break;

    }
  };
  return (
    <Fragment>
      <div class="modal fade" id="newtestmodal" tabindex="-1" role="dialog" aria-labelledby="newtestmodal" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="newtestmodal">CREATE TEST</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form className="p-3">
              <LabeledInput name={testName} labelText={"Test Name"} onChange={(e) => setTestName(e.target.value)} />
              {/* <label className="p-0 m-0 pl-1 pt-2">Test Name</label>
              <input
                className="w-100 p-2 mb-2"
                name="testName"
                type="text"
                placeholder="Test login as user and create ticket"
                onChange={handleFormChange}
              /> */}
              <label className="p-0 m-0 pl-1 pt-2">Priority Level</label>
              <input
                className="w-100 p-2 mb-2"
                name="priorityLevel"
                type="text"
                placeholder="undetermined"
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">Assigned To</label>
              <input
                className="w-100 p-2 mb-2"
                name="assignedTo"
                type="text"
                placeholder="undetermined"
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">setup</label>
              <input
                className="w-100 p-2 mb-2"
                name="setup"
                type="text"
                placeholder="user is a contributor "
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">steps</label>
              <input
                className="w-100 p-2 mb-2"
                name="steps"
                type="text"
                placeholder="login , navigate to to ticket create screen, create a ticket"
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">verifications</label>
              <input
                className="w-100 p-2 mb-2"
                name="verifications"
                type="text"
                placeholder="verifications"
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">automate</label>
              <input
                className="w-100 p-2 mb-2"
                name="automate"
                type="text"
                placeholder="automate"
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">relatedFeature</label>
              <input
                className="w-100 p-2 mb-2"
                name="relatedFeature"
                type="text"
                placeholder="relatedFeature"
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">jiraTicket</label>
              <input
                className="w-100 p-2 mb-2"
                name="jiraTicket"
                type="text"
                placeholder="jiraTicket"
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">notes</label>
              <input
                className="w-100 p-2 mb-2"
                name="notes"
                type="text"
                placeholder="notes"
                onChange={handleFormChange}
              />
              <div className="px-5 mx-5 pt-3">
                <div class="modal-footer">
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleSubmitForm}
                  >
                    Submit
                </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewTicket;
