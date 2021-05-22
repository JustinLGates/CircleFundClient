import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { api, setBearer } from "../axios";
import Loading from "../Components/Loading";
import SecondaryHeader from "../Components/SmallElements/SecondaryHeader"
import TestInfoTab from '../Components/TestInfoTab'

const Ticket = () => {

  const { projectId } = useParams();
  const { ticketId } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [ticketData, setTicketData] = useState([]);
  const [setupArray, setSetupArray] = useState([]);
  const [stepsArray, setStepsArray] = useState([]);
  const [verificationsArray, setVerificationsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [platformContext, setPlatformContext] = useState("iOS");

  useEffect(() => {
    getTicketData();
  }, []);

  async function getTicketData() {
    setBearer("Bearer " + (await getAccessTokenSilently()));
    loadTicket();
    setLoading(false);
  }

  const loadTicket = async () => {
    try {
      let res = await api.get(`project/${projectId}/ticket/${ticketId}`);
      setSetupArray(res.data.setup.split(","))
      setStepsArray(res.data.steps.split(","))
      setVerificationsArray(res.data.verifications.split(","))
      setTicketData(res.data);
    } catch (error) {
      console.error(error);
    }
  }


  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="container-fluid p-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between">
              <h1 className="d-inline">Test: {ticketData.testName}</h1>
              <h3 className="d-inline">Priotiry: {ticketData.priorityLevel || "N/A"}
                <span className="px-3">

                  <i class={ticketData.priorityLevel === "High" ? "fas fa-angle-double-up text-danger" : ticketData.priorityLevel === "Medium" ? "fas fa-angle-up text-danger " : ticketData.priorityLevel === "Undetermined" ? "fas fa-minus text-warning" : ticketData.priorityLevel === "Low" ? "fas fa-angle-down text-success" : "fas fa-angle-double-down text-success"}></i>
                </span>
              </h3>
            </div>

          </div>
          <div className="col-12">

            <SecondaryHeader text="Setup:" />
            {
              setupArray.map((item, index) => {
                return (<p className="pl-5" key={index}>{index + 1}. {item}</p>)
              })
            }
            <SecondaryHeader text="Steps:" />
            {
              stepsArray.map((item, index) => {
                return (<p className="pl-5" key={index}>{index + 1}. {item}</p>)
              })
            }
            <SecondaryHeader text="Verifications:" />
            {
              verificationsArray.map((item, index) => {
                return (<p className="pl-5" key={index}>{index + 1}. {item}</p>)
              })
            }
          </div>
        </div>

        <div className="row">
          <div className="col-12">

            <div className="d-flex align-items-center">
              <span>
                <a className={platformContext === "iOS" ? "p-1 mx-2 badge-primary text-light badge action" : "p-1 mx-2 bg-light text-primary badge action"} onClick={() => setPlatformContext("iOS")}>iOS</a> |
                </span>
              <span>
                <a className={platformContext === "Android" ? "p-1 mx-2 badge-primary text-light badge action" : "p-1 mx-2 bg-light text-primary badge action"} onClick={() => setPlatformContext("Android")}>Android </a> |
                </span>
              <span>
                <a className={platformContext === "Web" ? "p-1 mx-2 badge-primary text-light badge action" : "p-1 mx-2 bg-light text-primary badge action"} onClick={() => setPlatformContext("Web")}>Web </a>
              </span>
              <hr />
            </div>

            <h2>{platformContext}  Details </h2>

            <TestInfoTab ticketData={ticketData} platform={platformContext} />
          </div>
        </div>
      </div>
    </Fragment>

  );
};

export default Ticket;
