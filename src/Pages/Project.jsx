import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { api, setBearer } from "../axios";
import Loading from "../Components/Loading";
import TicketCard from "../Components/TicketCard"
import SideNavDrawer from "../Components/SideNavDrawer"

const Project = () => {

  const { getAccessTokenSilently } = useAuth0();

  const { projectId } = useParams();

  const [ticketData, setTicketData] = useState([]);
  const [activeDataTicket, setActiveTicketData] = useState([]);

  const [includesIos, setIncludesIos] = useState(true);
  const [includesAndroid, setIncludesAndroid] = useState(true);
  const [includesWeb, setIncludesWeb] = useState(true);

  const [query, setQuery] = useState("");

  const [projectName, setProjectName] = useState();

  const [loading, setLoading] = useState(true);

  const reportLinks = [
    { link: `/profile`, text: "Projects", icon: "fas fa-arrow-circle-left" },
    { link: `/project/${projectId}/new/ticket`, text: "New Test", icon: "fa fa-plus-circle " },
    { link: `/project/${projectId}/reports`, text: "Reports", icon: "fas fa-chart-pie" },
    { link: `/project/${projectId}/testSuite`, text: "Test Run", icon: "fas fa-flask" },
    { link: `/project/${projectId}/manageContributors`, text: "Contributors", icon: "fas fa-users" }

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
    let query = e.target.value
    setQuery(query)
    let tickets = filterTicketsQuery(ticketData, query)

    if (!includesAndroid) {
      tickets = filterTicketsPlatform(tickets, "android")
    }

    if (!includesIos) {
      tickets = filterTicketsPlatform(tickets, "ios")
    }

    if (!includesWeb) {
      tickets = filterTicketsPlatform(tickets, "web")
    }

    setActiveTicketData(tickets)
  }

  const filterTicketsByPlatform = (e, platform) => {
    let tickets = activeDataTicket
    switch (platform) {
      case "ios":
        setIncludesIos(e.target.checked)
        break
      case "android":
        setIncludesAndroid(e.target.checked)
        break
      case "web":
        setIncludesWeb(e.target.checked)
        break
      default:
        break;
    }
    console.log(tickets)
    console.log(e.target.checked)

    if (!e.target.checked) {
      tickets = tickets.filter(ticket => ticket.platform !== platform)
    }

    if (e.target.checked) {
      tickets = [...tickets,
      ...ticketData.filter(ticket => ticket.platform === platform),
      ]
    }

    if (query.length > 0) {
      tickets = filterTicketsQuery(tickets, query)
    }
    setActiveTicketData(tickets)
  }

  const filterTicketsPlatform = (tickets, platform) => {
    return tickets.filter(ticket => ticket.platform !== platform)
  }

  const filterTicketsQuery = (tickets, query) => {
    return tickets.filter((ticket => ticket.testName.includes(query) || ticket.relatedFeature.includes(query)))
  }



  return loading ? (
    <Loading />
  ) : (
    <Fragment>

      <div className="row">
        <div className="col-12 d-flex">

          <SideNavDrawer links={reportLinks} />

          <div className={"flex-grow-1 main-content"}>:

            <div className="px-lg-5 mx-lg-5">

              <h1 className="m-auto">{projectName}</h1>
              <div className="text-center shadow my-4 py-5 px-2 px-lg-3">
                <div className="row">

                  <div className="col-12">
                    <input onChange={(e) => filterTickets(e)} className="" id="search-bar" type="text" placeholder="Search by feature or test name" />
                  </div>
                  {/* <div className=""> */}

                  <div className="col-12 ">

                    <div className="row mt-3">
                      <div className="col-lg-4 col-12 d-lg-flex d-block justify-content-center p-2">
                        <div className="p-3 d-lg-flex d-block justify-content-center align-items-center">
                          <div className="text-center">
                            <label className="px-2">Web</label>
                            <div className="d-flex align-items-center">
                              <i className="fas fa-desktop px-2"></i>
                              <div className="d-inline-flex px-2">
                                <label className="switch">
                                  <input name="chk" type="checkbox" defaultChecked={true} onChange={(e) => filterTicketsByPlatform(e, "web")} />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-12 d-lg-flex d-block justify-content-center p-2">
                        <div className="p-3 d-lg-flex d-block justify-content-center align-items-center">
                          <div className="text-center">
                            <label className="px-2">Android</label>
                            <div className="d-flex align-items-center">
                              <i className="fab fa-android px-2"></i>
                              <div className="d-inline-flex px-2">
                                <label className="switch">
                                  <input name="chk" type="checkbox" defaultChecked={true} onChange={(e) => filterTicketsByPlatform(e, "android")} />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-12 d-lg-flex d-block justify-content-center p-2">
                        <div className="p-3 d-lg-flex d-block justify-content-center align-items-center">
                          <div className="text-center">
                            <label className="px-2">iOS</label>
                            <div className="d-flex align-items-center">
                              <i className="fab fa-apple px-2"></i>
                              <div className="d-inline-flex px-2">
                                <label className="switch">
                                  <input name="chk" type="checkbox" defaultChecked={true} onChange={(e) => filterTicketsByPlatform(e, "ios")} />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <hr className="bg-dark" />
                  </div>
                </div>



                {activeDataTicket.length > 0 ? <></> :
                  ticketData.length > 0 ?
                    <div className="d-flex justify-content-center align-items-center">
                      <h3>
                        No Search results were found.
                      </h3>
                    </div>
                    :
                    <div className="d-flex justify-content-center align-items-center">
                      <h3>
                        You Have not created any tests yet check out the side navigation drawer to create your first test case.
                      </h3>
                    </div>

                }
                {
                  activeDataTicket && activeDataTicket.map(ticket => {
                    return (<TicketCard key={ticket.ticketId} data={ticket} />)
                  })
                }
              </div>
            </div>

          </div>
        </div>
      </div >
    </Fragment >

  );
};

export default Project;
