import React, { state, useState } from "react";
import { api, setBearer } from "../axios";
import { useParams } from "react-router-dom"

import SideNavDrawer from "../Components/SideNavDrawer"
const ManageContributors = () => {

  const { projectId } = useParams();
  const [contributorRole, setContributorRole] = useState("contributor")
  const [contributorEmail, setContributorEmail] = useState()

  const reportLinks = [
    { link: `/projects/${projectId}`, text: "Project", icon: "fas fa-arrow-circle-left" },
  ]

  const addContributor = () => {
    const data = {
      role: contributorRole,
    }
    console.log("added..." + contributorEmail)
    try {
      api.post(`project/${projectId}/contributor/add/${contributorEmail}`, data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="row">
      <div className="col-12 d-flex">

        <SideNavDrawer links={reportLinks} />

        <div className="p-4">
          <div>
            <h2>Manage Contributors</h2>
            <label htmlFor="">Users Email</label>
            <input onChange={(e) => setContributorEmail(e.target.value)} type="text" placeholder="Users Id" />
            {
              contributorEmail === undefined ? // TODO add verifications that this is a valid email.
                <button className="btn btn-success text-light" disabled={true} onClick={addContributor}><i class="fas fa-user-plus"></i></button>
                :
                <button className="btn btn-success text-light" onClick={addContributor}><i class="fas fa-user-plus"></i></button>
            }
          </div>
          {/* TODO map users on card for existing  */}

        </div>
      </div>
    </div>
  );
};

export default ManageContributors;