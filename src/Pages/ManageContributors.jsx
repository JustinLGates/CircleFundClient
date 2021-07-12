import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api, setBearer } from "../axios";
import { useParams } from "react-router-dom"

import SideNavDrawer from "../Components/SideNavDrawer"
const ManageContributors = () => {

  useEffect(() => {
    getContributorData();
  }, []);

  const { projectId } = useParams();

  const { getAccessTokenSilently } = useAuth0();
  const [contributors, setContributors] = useState([]);
  const [contributorRole, setContributorRole] = useState("contributor");
  const [contributorEmail, setContributorEmail] = useState();
  const [userProfile, setUserProfile] = useState();

  const reportLinks = [
    { link: `/projects/${projectId}`, text: "Project", icon: "fas fa-arrow-circle-left" },
  ]

  const getContributorData = async () => {
    setBearer("Bearer " + (await getAccessTokenSilently()));
    try {
      let profile = await api.get(`profile`)
      await setUserProfile(profile.data)
      let res = await api.get(`project/${projectId}/projectContributors`)
      const contributors = res.data.filter((elem) => elem.contributorName !== profile.data.name || elem.role !== "owner")
      await setContributors(contributors)
    } catch (error) {
      console.log(error)
    }
  }

  const addContributor = async () => {
    const data = {
      role: contributorRole,
    }
    try {
      const res = await api.post(`project/${projectId}/contributor/add/${contributorEmail}`, data)
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteContributor = async (e, id) => {
    e.preventDefault();
    try {
      const res = await api.delete(`project/${projectId}/contributor/${id}`)
      console.log(res.data)
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
            <label >User id token</label> <small className="text-grey pl-5">on Profile page</small>
            <input onChange={(e) => setContributorEmail(e.target.value)} type="text" placeholder="Users Id" />
            {
              contributorEmail === undefined ? // TODO add verifications that this is a valid email.
                <button className="btn btn-success text-light" disabled={true} onClick={addContributor}><i class="fas fa-user-plus"></i></button>
                :
                <button className="btn btn-success text-light" onClick={addContributor}><i class="fas fa-user-plus"></i></button>
            }
          </div>
          <div>
            <div className="shadow p-3">
              {contributors && contributors.map((data) => {
                return (
                  <div className="my-2 ">

                    <div className="p-2 px-2 outline m-0 d-flex justify-content-between align-items-center">
                      <label key={data.userId}>{data.contributorName}</label>
                      <button className="btn btn-danger" onClick={(e) => deleteContributor(e, data.userId)} >Remove contributor</button>
                    </div>
                  </div>

                )
              })

              }
            </div>
            <h5></h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageContributors;