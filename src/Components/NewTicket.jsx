import React, { Fragment, useState } from "react";
import { api } from "../axios";
import LabeledInput from "./Composites/LabeledInput"
import Button from "./SmallElements/Button"
import Label from './SmallElements/Label'

const NewTicket = ({ projectId }) => {
  const [testName, setTestName] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("Undetermined");
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
    e.preventDefault()
    formData = {
      testName: testName,
      priorityLevel: priorityLevel,
      assignedTo: assignedTo,
      setup: setup,
      steps: steps,
      verifications: verifications,
      iosStatus: "Blocked",
      androidStatus: "In Proggress",
      webStatus: "Complete",
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
              <LabeledInput name={priorityLevel} labelText={"Priority Level"} onChange={(e) => setPriorityLevel(e.target.value)} />
              <LabeledInput name={assignedTo} labelText={"Assign to"} onChange={(e) => setAssignedTo(e.target.value)} />
              <LabeledInput name={setup} labelText={"Setup"} onChange={(e) => setSetup(e.target.value)} />
              <LabeledInput name={steps} labelText={"Steps"} onChange={(e) => setSteps(e.target.value)} />
              <LabeledInput name={verifications} labelText={"Verification"} onChange={(e) => setVerifications(e.target.value)} />
              <LabeledInput name={jiraTicket} labelText={"Jira ticket"} onChange={(e) => setJiraTicket(e.target.value)} />
              <LabeledInput name={relatedFeature} labelText={"Jira ticket"} onChange={(e) => setRelatedFeature(e.target.value)} />
              <LabeledInput name={notes} labelText={"Notes"} onChange={(e) => setNotes(e.target.value)} />

              {/* Move to component */}
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
              {/* Move to component */}

              {/* Move to component */}
              <div className="form-element-container">
                <Label text={"Automation Priority"} />
                <select class="form-select" aria-label="Select priority level">
                  <option default>Undifined</option>
                  <option>High</option>
                  <option>Mid</option>
                  <option>Low</option>
                  <option>None</option>
                </select>
              </div>
              {/* Move to component */}

              {/* Move to component */}
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
              {/* Move to component */}

              {/* Move to component */}
              <textarea rows={6} className="w-100">
              </textarea>
              {/* Move to component */}

              <div className="px-5 mx-5 pt-3">
                <div class="modal-footer">
                  <Button text={"Create"} onclick={handleSubmitForm} />
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
