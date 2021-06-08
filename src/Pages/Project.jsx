import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { api, setBearer } from "../axios";
import Loading from "../Components/Loading";
import TicketCard from "../Components/TicketCard"
import SideNavDrawer from "../Components/SideNavDrawer"

const Project = () => {

  const { projectId } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [ticketData, setTicketData] = useState([]);
  const [activeDataTicket, setActiveTicketData] = useState([]);
  const [sortBy, setSortBy] = useState("priority");
  const [projectName, setProjectName] = useState();
  const [loading, setLoading] = useState(true);

  const reportLinks = [
    { link: `/profile`, text: "Projects", icon: "fas fa-arrow-circle-left" },
    { link: `/project/${projectId}/new/ticket`, text: "New Test", icon: "fa fa-plus-circle " },
    { link: `/project/${projectId}/reports`, text: "Reports", icon: "fas fa-chart-pie" },
    { link: `/project/${projectId}/test_suite`, text: "Test Run", icon: "fas fa-flask " }
  ]

  useEffect(() => {
    getTicketData();
  }, []);

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
      setActiveTicketData(res.data)
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

  const filterTickets = (e) => {
    ticketData.forEach(ticket => console.log(ticket.testName + " " + ticket.id))
    let query = e.target.value
    let tickets = ticketData.filter((ticket => ticket.testName.includes(query) || ticket.relatedFeature.includes(query)))
    setActiveTicketData(tickets)
  }

  return loading ? (
    <Loading />
  ) : (
    <Fragment>

      <div className="row">
        <div className="col-12 d-flex">

          <SideNavDrawer links={reportLinks} />

          <div className="flex-grow-1 shadow main-content">
            <h1 className="mw-1000 m-auto">{projectName}</h1>
            <div className="text-center ">
              <div className="d-flex justify-content-center">
                <input onChange={(e) => filterTickets(e)} className="m-3" id="search-bar" type="text" placeholder="Search by feature or test name" />
              </div>
              {
                activeDataTicket && activeDataTicket.map(ticket => {
                  return (<TicketCard key={ticket.ticketId} data={ticket} />)
                })
              }
            </div>
          </div>
        </div>
      </div>
    </Fragment>

  );
};

export default Project;
