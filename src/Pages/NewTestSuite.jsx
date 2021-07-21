import React, { useState, useEffect } from "react";
import SideNavDrawer from "../Components/SideNavDrawer"
import { useParams, useHistory } from "react-router-dom"
import LabeledInput from "../Components/Composites/LabeledInput"
import { api, setBearer } from "../axios";
import { useAuth0 } from "@auth0/auth0-react";


const NewTestSuite = () => {

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {

  }, []);

  const { projectId } = useParams();
  const history = useHistory();

  const [platform, setPlatform] = useState();

  const [testingIos, setTestingIos] = useState(false);
  const [testingAndroid, setTestingAndroid] = useState(false);
  const [testingWeb, setTestingWeb] = useState(false);

  const [feature, setFeature] = useState();


  const reportLinks = [{ link: `/projects/${projectId}`, text: "Project", icon: "fas fa-arrow-circle-left" }]

  async function createTestRun(e) {
    e.preventDefault()
    const data = {
      platform: platform,
      feature: "test",
      status: "incomplete"

    }

    try {
      let testRun = await api.post(`project/${projectId}/testrun`, data);
      console.log("TEST RUN")
      console.log(testRun.data.id)
      let tickets = await api.get(`project/${projectId}/ticket`)
      let filteredTickets = tickets.data.filter(t => t.platform === data.platform && t.relatedFeature === data.feature)

      console.log("tickets..")
      console.log(filteredTickets)
      await filteredTickets.forEach(ticket => {
        let data = {
          testName: ticket.testName,
          testId: ticket.id
        }

        console.log("Sending data:")
        console.log(data)
        api.post(`project/${projectId}/testrun/${testRun.data.id}/testinstance`, data)
      })
      history.push(`/project/${projectId}/testruns`)
    } catch (error) {
      console.error(error);
    }
  }

  const setPlatformIos = () => {
    setPlatform("ios")
    setTestingAndroid(false)
    setTestingWeb(false)
    setTestingIos(true)
  }

  const setPlatformAndroid = () => {
    setPlatform("android")
    setTestingIos(false)
    setTestingWeb(false)
    setTestingAndroid(true)
  }

  const setPlatformWeb = () => {
    setPlatform("web")
    setTestingIos(false)
    setTestingAndroid(false)
    setTestingWeb(true)
  }

  return (
    <div className="row">
      <div className="col-12 d-flex">
        <SideNavDrawer links={reportLinks} />
        <form className="p-5 flex-grow-1 m-auto">


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
                          <input name="chk" type="checkbox" checked={testingWeb} onChange={(e) => setPlatformWeb(e, "web")} />
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
                          <input name="chk" type="checkbox" checked={testingAndroid} onChange={(e) => setPlatformAndroid(e, "android")} />
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
                          <input name="chk" type="checkbox" checked={testingIos} onChange={(e) => setPlatformIos(e, "ios")} />
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

          <button onClick={(e) => createTestRun(e)} className="btn btn-success">CREATE SUITE</button>
        </form>
      </div>
    </div>
  );
};

export default NewTestSuite;

