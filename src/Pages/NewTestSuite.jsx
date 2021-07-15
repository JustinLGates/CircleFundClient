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

  const [suiteName, setSuiteName] = useState();

  const reportLinks = [{ link: `/projects/${projectId}`, text: "Project", icon: "fas fa-arrow-circle-left" }]

  async function createTestSuite() {
    try {
      let res = await api.post(`project/${projectId}/testSuite`);
      console.error(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="row">
      <div className="col-12 d-flex">
        <SideNavDrawer links={reportLinks} />
        <form className="p-5 flex-grow-1 m-auto">

          <LabeledInput name={"suiteName"} labelText={"Test Name"} onChange={(e) => setSuiteName(e.target.value)} />

          <button className="btn btn-success">CREATE SUITE</button>
        </form>
      </div>
    </div>
  );
};

export default NewTestSuite;

