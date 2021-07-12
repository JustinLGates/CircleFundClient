import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { api, setBearer } from "../axios";
import Loading from "../Components/Loading";
import EditText from "../Components/Composites/EditText"
import SideNavDrawer from "../Components/SideNavDrawer"
import LabeledInput from "../Components/Composites/LabeledInput"
import Button from "../Components/SmallElements/Button/Button"
import Label from "../Components/SmallElements/Label"

const Ticket = () => {

  const { projectId } = useParams();
  const { ticketId } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [setupArray, setSetupArray] = useState([]);
  const [stepsArray, setStepsArray] = useState([]);
  const [verificationsArray, setVerificationsArray] = useState([]);
  const [testName, setTestName] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [testNumber, setTestNumber] = useState("no data set");
  const [assignedTo, setAssignedTo] = useState("");
  const [setupStep, setSetupStep] = useState("");
  const [steps, setSteps] = useState("");
  const [status, setStatus] = useState("");
  const [verifications, setVerifications] = useState("");
  const [automate, setAutomate] = useState(true);
  const [relatedFeature, setRelatedFeature] = useState("");
  const [jiraTicket, setJiraTicket] = useState("");
  const [designLink, setDesignLink] = useState("");
  const [platform, setPlatform] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingSetup, setEditingSetup] = useState(false)
  const [editingSteps, setEditingSteps] = useState(false)
  const [editingVerifications, setEditingVerifications] = useState(false)


  const reportLinks = [
    { link: `/projects/${projectId}`, text: "Project", icon: "fas fa-arrow-circle-left" },
  ]

  useEffect(() => {
    getTicketData();
  }, []);

  async function getTicketData() {
    setBearer("Bearer " + (await getAccessTokenSilently()));
    loadTicket();
  }

  const editTestName = async (value) => {
    setTestName(value)
  }

  const editAutomationStatus = async (value) => {
    setAutomate(value)
    sendEditTicketRequest(null, { automate: value })
  }

  const handelEditRequest = async () => {
    sendEditTicketRequest()
  }

  const loadTicket = async () => {
    try {
      let res = await api.get(`project/${projectId}/ticket/${ticketId}`);
      console.log(res.data)
      setSetupArray(res.data.setup.split(","))
      setStepsArray(res.data.steps.split(","))
      setVerificationsArray(res.data.verifications.split(","))
      setPriorityLevel(res.data.priorityLevel);
      setRelatedFeature(res.data.relatedFeature);
      setStatus(res.data.status);
      setJiraTicket(res.data.jiraTicket)
      setDesignLink(res.data.designLink)
      setTestName(res.data.testName);
      setPlatform(res.data.platform);
      setTestNumber(res.data.testNumber)
      setAutomate(res.data.automate)

      console.log(res.data.automate)

    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  let formData = {};

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    sendEditTicketRequest();
  };

  const sendEditTicketRequest = (e = null, data = {}) => {
    if (e != null) {
      e.preventDefault();
    }
    console.log("saving automete.. Value:" + data.automate)

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
      testName: testName || "",
      priorityLevel: data.priorityLevel || priorityLevel || "undetermined",
      assignedTo: assignedTo || "unassigned",
      setup: setupArray.toString() || "",
      steps: stepsArray.toString() || "",
      verifications: verificationsArray.toString() || "",
      status: data.status || status || "new",
      automate: automate,
      relatedFeature: relatedFeature || "",
      jiraTicket: jiraTicket || "",
      designLink: designLink || "",
      notes: notes || "",
    };

    if (data.automate !== undefined) { formData.automate = data.automate }

    try {
      api.put(`project/${projectId}/ticket/${ticketId}`, formData);
    } catch (error) {
      console.error(error);
    }
  }

  const editDesignLink = (value) => {
    console.log(value)
    setDesignLink(value)
    console.log(designLink)
  }
  const editPriorityLevel = (e) => {
    setPriorityLevel(e.target.value)
    sendEditTicketRequest(e, { priorityLevel: e.target.value })
  }

  const editStatus = (e) => {
    setStatus(e.target.value)
    sendEditTicketRequest(e, { status: e.target.value })
  }

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

  const sendEditSetupRequest = (e) => {
    setEditingSetup(false)
    setSetupStep("")
    sendEditTicketRequest(e)
  }

  const sendEditStepsRequest = (e) => {
    setEditingSteps(false)
    setSteps("")
    sendEditTicketRequest(e)
  }

  const sendEditVerificationsRequest = (e) => {
    setEditingVerifications(false)
    setVerifications("")
    sendEditTicketRequest(e)
  }

  return loading ? (
    <Loading />
  ) : (

    <div className="row">
      <div className="col-12 d-flex">

        <SideNavDrawer links={reportLinks} />

        <form className="p-5 flex-grow-1 m-auto ">
          <div className="d-flex justify-content-between p-2">
            <h5>Platform: {platform}</h5>
            <h5>Test Number: {testNumber}</h5>
          </div>
          <EditText inputValue={testName} save={handelEditRequest}
            name={testName} labelText={"Test Name: "} onChange={(e) => editTestName(e.target.value)} />


          {/* Setup steps */}
          {editingSetup ?
            <div className="shadow p-3 my-3">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <LabeledInput className="pr-2"
                    inputValue={setupStep}
                    name={"setup Step"}
                    labelText="Setup"
                    onChange={(e) => setSetupStep(e.target.value)} />
                </div>

                <span className="p-1 mr-1">
                  <button title="Add setup step" className=" btn btn-success mr-4" onClick={(e) => addSetupStep(e)}><i className="fa fa-plus"></i></button>
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
              <span className="p-2 m-2">
                <button title="Remove step" className=" btn btn-success" onClick={(e) => sendEditSetupRequest(e)} >SAVE</button>
              </span>
              <span className="p-2 m-2">
                <button title="Remove step" className=" btn btn-danger" onClick={() => setEditingSetup(false)} >CANCEL</button>
              </span>
            </div>
            : <div onClick={() => setEditingSetup(true)} className="highlight boxed-2 action p-3 my-3">
              <h5>Setup:</h5>
              {
                setupArray.map((item, index) =>
                  <div key={index} className="">
                    <div className="labeled-input pl-5">
                      <Label text={`${index + 1}. ${item}`}></Label>
                    </div>
                  </div>
                )
              }

            </div>
          }

          {/* Setup steps */}
          {
            editingSteps ?
              <div className="shadow my-3 p-3">
                <div className="d-flex ">
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
                {stepsArray &&
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
                <span className="p-2 m-2">
                  <button title="Save" className=" btn btn-success mr-4"
                    onClick={(e) => sendEditStepsRequest(e)} >SAVE</button>
                </span>
                <span className="p-2 m-2">
                  <button title="Cancel" className=" btn btn-danger mr-4"
                    onClick={() => setEditingSteps(false)} >CANCEL</button>
                </span>
              </div>
              :

              <div className="boxed-2 action highlight p-3 my-3">

                <h5 >Steps:</h5>
                <div onClick={() => setEditingSteps(true)} className="">{
                  stepsArray.map((item, index) =>
                    <div key={index} className="d-flex">
                      <div className="flex-grow-1 labeled-input pl-5">
                        <Label text={`${index + 1}. ${item}`}></Label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
          }

          {/* verification steps */}
          {
            editingVerifications ?
              <div className="shadow p-3 my-3">
                <div className="d-flex ">
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

                }<span className="p-2 m-2">
                  <button title="Remove step" className=" btn btn-success" onClick={(e) => sendEditVerificationsRequest(e)} >SAVE</button>
                </span>
                <span className="p-2 m-2">
                  <button title="Remove step" className=" btn btn-danger" onClick={() => setEditingVerifications(false)} >CANCEL</button>
                </span>

              </div>

              :
              <div onClick={() => setEditingVerifications(true)} className="boxed-2 action highlight p-3 py-3">
                <h5>Verifications</h5>
                {
                  verificationsArray && verificationsArray.map((item, index) =>
                    <div key={index} className="d-flex">
                      <div className="flex-grow-1 labeled-input pl-5">
                        <Label text={`${index + 1}. ${item}`}></Label>
                      </div>
                    </div>
                  )
                }
              </div>
          }

          <EditText textIsLink={true} inputValue={jiraTicket} save={handelEditRequest}
            name={"jiraTicket"} labelText={"Jira Ticket"} onChange={(e) => setJiraTicket(e.target.value)} />


          <EditText textIsLink={true} inputValue={designLink} save={handelEditRequest}
            name={"designLink"} labelText={"Design Link"} onChange={(e) => editDesignLink(e.target.value)} />

          <EditText inputValue={relatedFeature} save={handelEditRequest}
            name={"relatedFeature"} labelText={"Related Feature"} onChange={(e) => setRelatedFeature(e.target.value)} />

          <div className="form-element-container d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <label className="switch-label">Automate</label>
              <div className="d-inline-flex">
                <label class="switch">
                  <input name="chk" type="checkbox" defaultChecked={automate} onChange={(e) => editAutomationStatus(e.target.checked)} />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-element-container">
            <span className="">
              <Label text={"Priority"} />
            </span>

            <select onChange={(e) => editPriorityLevel(e)} class="form-select" aria-label="Select automation priority">
              <option className="bg-primary text-light" default >{priorityLevel}</option>
              {priorityLevel !== "High" && <option value="High">High</option>}
              {priorityLevel !== "Medium" && <option value="Medium">Medium</option>}
              {priorityLevel !== "Low" && <option value="Low">Low</option>}
              {priorityLevel !== "Backlog" && <option value="Backlog">Backlog</option>}
            </select>
          </div>

          <div className="form-element-container">
            <span className="">
              <Label text={"Status"} />
            </span>

            <select onChange={(e) => editStatus(e)} class="form-select" aria-label="Select automation status">
              <option className="bg-primary text-light" default value={status} >{status}</option>
              {status !== "blocked" && <option value="blocked">Blocked</option>}
              {status !== "complete" && <option value="complete">Complete</option>}
              {status !== "unable" && <option value="unable">Unable</option>}
              {status !== "invalid" && <option value="invalid">Invalid</option>}
            </select>
          </div>

          <div className="form-element-container">
            <span className="">
              <Label text={"Assigned To"} />
            </span>

            <select onChange={(e) => setAssignedTo(e.target.value)} class="form-select" aria-label="Select assign to">
              <option default value="Add names" >Static names</option>
              <option value="joe">joe</option>
              <option value="bob">bob</option>
              <option value="bill">bill</option>
              <option value="jim">Invalid</option>
            </select>
          </div>

          <div className="d-flex flex-column mx-2rem">
            <label classname="" htmlFor={notes}>Notes</label>
            <textarea className="" cols="8" name={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div className="px-5 mx-5 pt-3">
            <div class="modal-footer">
              <Button text={"Update"} onclick={handleSubmitForm} />
            </div>
          </div>
        </form>
      </div>
    </div >
  );
};

export default Ticket;
