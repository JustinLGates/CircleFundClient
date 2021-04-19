import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { api, setBearer } from "../axios";
import Loading from "../Components/Loading";

const Ticket = () => {

  const { projectId } = useParams();
  const { ticketId } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTicketData();
  }, []);
  useEffect(() => {
  }, [ticketData])

  async function getTicketData() {
    setBearer("Bearer " + (await getAccessTokenSilently()));
    loadTicket();
    setLoading(false);
  }

  const loadTicket = async () => {
    try {
      let res = await api.get(`project/${projectId}/ticket/${ticketId}`);
      setTicketData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div className="p-2">
            <h1>Hello world{ticketData.testName}</h1>
          </div>
        </div>
      </div>
    </Fragment>

  );
};

export default Ticket;
