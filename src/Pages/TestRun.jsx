import React, { useState, useEffect } from "react";
import SideNavDrawer from "../Components/SideNavDrawer"
import { api, setBearer } from "../axios"
import { useParams } from "react-router-dom"
import Loading from "../Components/Loading"
import { useAuth0 } from "@auth0/auth0-react";
import EditTicketComponent from "../Components/EditTicketComponent"

const TestRun = () => {

  const { getAccessTokenSilently } = useAuth0();
  const { projectId, testRunId } = useParams();

  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState({})
  const [ticketData, setTicketData] = useState([]) // All tests...
  const [currentTestInstance, setCurrentTestInstance] = useState(0) // All being tested...

  const reportLinks = [
    { link: `/project/${projectId}/testruns`, text: "Test Run's", icon: "fas fa-arrow-circle-left" }
  ]

  useEffect(() => {
    loadRun()
    return () => {

    }
  }, [])

  async function loadRun() {
    try {
      setBearer("Bearer " + (await getAccessTokenSilently()));
    } catch (error) {
      console.error(error)
    }
    await getTestRun()
    await getTickets()
    ticketData.filter(ticket =>
      ticket.platform === run.platform && ticket.feature == run.feature
    )

    setLoading(false)
  }


  const getTestRun = async () => {
    try {
      const res = await api.get(`project/${projectId}/testrun/${testRunId}`);

      console.log(res.data)
      setRun(res.data[0])
    } catch (error) {
      console.error(error);
    }
  }

  const getTickets = async () => {
    try {
      let res = await api.get(`project/${projectId}/ticket`);
      setTicketData(res.data);
      setCurrentTestInstance(res.data)
    } catch (error) {
      console.error(error);
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
                <h2 className="text-left my-3">Test Run: {run.id}</h2>
                <label className="">Platform: {run.platform}</label><br />
                <label className="">Feature: {run.feature}</label><br />
                <label className="">Status: {run.status}</label>
                <div>
                </div>
                <h5>Test : 5</h5>
                <EditTicketComponent ticketId={currentTestInstance} />
                <button>pass</button> <button>fail</button>
              </div>

          }
        </div>
      </div>
    </div>)
}

export default TestRun;