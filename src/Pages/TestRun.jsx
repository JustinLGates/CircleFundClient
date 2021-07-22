import React, { useState, useEffect } from "react";
import SideNavDrawer from "../Components/SideNavDrawer"
import { api, setBearer } from "../axios"
import { useParams } from "react-router-dom"
import Loading from "../Components/Loading"
import { useAuth0 } from "@auth0/auth0-react";
import Label from "../Components/SmallElements/Label"
const TestRun = () => {

  const { getAccessTokenSilently } = useAuth0();
  const { projectId } = useParams();
  const { testRunId } = useParams();

  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState({})
  const [activeTest, setActiveTest] = useState();
  const [currentTestInstances, setCurrentTestInstances] = useState([]) // All being tested...
  const [totalComplete, setTotalComplete] = useState(0)
  const [setupArray, setSetupArray] = useState([]);
  const [stepsArray, setStepsArray] = useState([]);
  const [verificationsArray, setVerificationsArray] = useState([]);

  const reportLinks = [
    { link: `/project/${projectId}/testruns`, text: "Test Run's", icon: "fas fa-arrow-circle-left" }
  ]

  useEffect(() => {
    loadRun()
    return () => { }
  }, [])

  async function loadRun() {
    await loadTickets();
    setLoading(false)
  }

  const loadTickets = async () => {
    await setAuth()
    getTickets()
  }

  const setAuth = async () => {
    try {
      setBearer("Bearer " + (await getAccessTokenSilently()));
    } catch (error) {
      console.error(error)
    }
  }

  const getTickets = async () => {
    try {
      let run = await api.get(`project/${projectId}/testrun/${testRunId}`);
      let res = await api.get(`project/${projectId}/testrun/${testRunId}/testinstance`);

      setRun(run.data)
      setCurrentTestInstances(res.data)
      console.log()
      console.log("Test Instances are set to...")
      console.log(res.data)
      setTotalComplete(res.data.filter(i => i.status !== "new").length)
    } catch (error) {
      console.error(error);
    }
  }

  const getTicketById = async (ticketId) => {
    let res = await api.get(`project/${projectId}/ticket/${ticketId}`)
    setActiveTest(res.data);
    setSetupArray(res.data.setup.split(","))
    setStepsArray(res.data.steps.split(","))
    setVerificationsArray(res.data.verifications.split(","))
  }

  const changeActiveTest = (test) => {

    console.log("active test: " + test.testName);
    getTicketById(test.testId);
  }

  const editTestStatus = (status) => {

    let indexToUpdate = currentTestInstances.findIndex(item => item.testId === activeTest.id)
    let newArray = [...currentTestInstances]
    newArray[indexToUpdate].status = status
    editTestInstance(newArray[indexToUpdate])
    setCurrentTestInstances(newArray)

    setTotalComplete(newArray.filter(i => i.status !== "new").length)
    if (indexToUpdate + 1 < newArray.length) {
      changeActiveTest(newArray[(indexToUpdate + 1)])
    }
  }

  const editTestInstance = async (testInstance) => {
    try {
      console.log(testInstance)
      api.put(`project/${projectId}/testrun/${testRunId}/testinstance/${testInstance.testInstanceId}`, testInstance)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="row">
      <div className="col-12 d-flex">

        <SideNavDrawer links={reportLinks} />

        <div className="p-4 mt-5 flex-grow-1">
          {
            loading ?
              <Loading />
              :
              <div>
                <div className="row">
                  <div className="col-6">

                    <div className="">
                      <h2 className="text-left my-2">Test Run: {testRunId}</h2>

                    </div>

                    <div>
                    </div>
                    <h5>{totalComplete || "0"} of {currentTestInstances.length} Complete. </h5>
                    {
                      currentTestInstances && currentTestInstances.map(test =>
                        <div className="py-3" key={test.testId} onClick={() => changeActiveTest(test)}>
                          <div className="boxed-2 d-flex justify-content-between action highlight p-2 mw-500">

                            <h5 className="d-inline">
                              {test.testName}
                            </h5>
                            <div>
                              {
                                test.status === "pass" ?
                                  <i className="text-success fas fa-check"></i>
                                  : test.status === "fail" ?
                                    <i className="text-danger fas fa-times"></i>
                                    :
                                    <p className="text-secondary">NEW</p>
                              }
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </div>
                  {activeTest ?

                    <div className={currentTestInstances.length !== totalComplete ? "col-6 shadow p-3 text-dark" : "col-6 shadow text-secondary p-3 text-dark"}>

                      <h5 className="px-3">Name: {activeTest.testName}</h5>
                      <h4 className="">Setup</h4>
                      <h5 className="px-3">{setupArray.map((item, index) =>
                        <Label text={`${index + 1}. ${item}`}></Label>
                      )}</h5>
                      <h4 className="">Steps</h4>
                      <h5 className="px-3">{stepsArray.map((item, index) =>
                        <Label text={`${index + 1}. ${item}`}></Label>
                      )}</h5>
                      <h4 className="">Verifications</h4>

                      <h5 className="px-3">{verificationsArray.map((item, index) =>
                        <Label text={`${index + 1}. ${item}`}></Label>
                      )}</h5>

                      <div className="d-flex justify-content-around">
                        <button onClick={() => editTestStatus("pass")} className="btn btn-success">pass</button>
                        <button onClick={() => editTestStatus("fail")} className="btn btn-danger">fail</button>
                      </div>
                    </div>
                    : <></>
                  }
                </div>
              </div>
          }
        </div>
      </div>
    </div>)
}

export default TestRun;