import React, { useState, useEffect } from "react";
import SideNavDrawer from "../Components/SideNavDrawer"
import { api, setBearer } from "../axios"
import { useParams, Link } from "react-router-dom"
import Loading from "../Components/Loading"
import { useAuth0 } from "@auth0/auth0-react";
const TestSuites = () => {

  const { getAccessTokenSilently } = useAuth0();
  const { projectId } = useParams();

  const [loading, setLoading] = useState(true);
  const [runs, setRuns] = useState([])

  const reportLinks = [
    { link: `/projects/${projectId}`, text: "Project", icon: "fas fa-arrow-circle-left" },
    { link: `/project/${projectId}/new/testrun`, text: "CREATE TEST SUITE", icon: "fa fa-plus-circle" },
  ]

  useEffect(() => {
    loadRuns()
    setLoading(false)
    return () => {

    }
  }, [])

  async function loadRuns() {
    try {
      setBearer("Bearer " + (await getAccessTokenSilently()));
    } catch (error) {
      console.error(error)
    }

    try {
      const res = await api.get(`project/${projectId}/testrun`);

      console.log(res.data)
      setRuns(res.data)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="row">
      <div className="col-12 d-flex">

        <SideNavDrawer links={reportLinks} />

        <div className="p-4 mt-5 flex-grow-1">
          <h2 className="text-left my-3">Test Runs</h2>
          {
            loading ?
              <Loading />

              :

              <div>
                {
                  runs.length > 0 ?
                    <div>
                      {runs.map(run =>
                        <Link key={run.id} className="boxed-2 highlight action p-2" title="start run." to={`/project/${projectId}/testrun/${run.id}`}>
                          <label className="">Platform: {run.platform}</label><br />
                          <label className="">Feature: {run.feature}</label><br />
                          <label className="">Status: {run.status}</label>
                        </Link>
                      )

                      }
                    </div> :

                    <h3 className="mt-lg-5 text-center">No test runs started add a test run to get started.</h3>
                }
              </div>

          }
          <div>


          </div>

        </div>
      </div>
    </div>
  );
};

export default TestSuites;