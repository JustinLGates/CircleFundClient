import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { api, setBearer } from "../axios";
import Loading from "../Components/Loading";
import TicketCard from "../Components/TicketCard"
import { Link } from "react-router-dom";
import NewTicket from "../Components/NewTicket"

const Project = () => {

  const { projectId } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [ticketData, setTicketData] = useState([]);
  const [projectName, setProjectName] = useState();
  const [loading, setLoading] = useState(true);

  // get the profile data when page loads and set state of the profiledata
  useEffect(() => {
    getTicketData();
  }, []);
  useEffect(() => {
  }, [ticketData])

  async function getTicketData() {
    setBearer("Bearer " + (await getAccessTokenSilently()));
    getProject();
    loadTickets();
    setLoading(false);
  }

  const loadTickets = async () => {
    try {
      let res = await api.get(`project/${projectId}/ticket`);
      setTicketData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getProject = async () => {
    try {
      const res = await api.get(`project/${projectId}`);
      setProjectName(res.data.name)
    } catch (error) {
      console.log(error)
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div className="p-2">
            <h1>{projectName}</h1>
          </div>
        </div>
      </div>
      <div className="row">
        {
          ticketData && ticketData.map(ticket => {
            return (

              <TicketCard key={ticket.ticketId} data={ticket} />
            )

          })
        }
      </div>
      <div className="row">
        <div className="col-12">
          <NewTicket projectId={projectId} />
        </div>
      </div>
    </Fragment>

  );
};

export default Project;
