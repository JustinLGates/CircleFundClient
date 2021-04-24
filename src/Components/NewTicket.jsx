import React, { Fragment, useState } from "react";
import { api } from "../axios";
import LabeledInput from "./Composites/LabeledInput"
import CheckBox from "./SmallElements/Checkbox"
import Button from "./SmallElements/Button"

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
              <LabeledInput name={verifications} labelText={"Verifications"} onChange={(e) => setVerifications(e.target.value)} />
              <LabeledInput name={jiraTicket} labelText={"Jira ticket"} onChange={(e) => setJiraTicket(e.target.value)} />
              <LabeledInput name={relatedFeature} labelText={"Jira ticket"} onChange={(e) => setRelatedFeature(e.target.value)} />
              <LabeledInput name={notes} labelText={"Notes"} onChange={(e) => setNotes(e.target.value)} />
              <CheckBox name={automate} onChange={(e) => setAutomate(false)} text="Automate" />
              <p>{automate ? "true" : "false"}</p>
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
