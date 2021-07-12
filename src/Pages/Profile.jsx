import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api, setBearer } from "../axios";
import Loading from "../Components/Loading";
import Dashboard from "../Components/Dashboard";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  // get the profile data when page loads and set state of the profiledata
  useEffect(() => {
    getProfileData();
  }, []);

  const [profileData, setProfileData] = useState();
  const [loading, setLoading] = useState(true);

  async function getProfileData() {
    setBearer("Bearer " + (await getAccessTokenSilently()));
    try {
      let res = await api.get("profile");
      setProfileData(res.data);
    } catch (error) {
      console.error(error);
    }
    if (profileData === undefined) {
      await createProfile()
    }
    setLoading(false);
  }

  async function createProfile() {
    try {
      const data = { name: user.nickname }
      const response = await api.post("profile", data);
      console.log("Created Profile response" + response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return loading ? (
    <Loading />
  ) : (
    isAuthenticated && (
      <Fragment>
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <div className="p-2">
              <img className="profile-pic" src={user.picture} />
              <h6>Hello, {user.nickname}</h6>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Dashboard profileData={profileData} />
          </div>
        </div>
      </Fragment>
    )
  );
};

export default Profile;
