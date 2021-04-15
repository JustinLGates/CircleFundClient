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

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getProfileData() {
    setBearer("Bearer " + (await getAccessTokenSilently()));
    try {
      let res = await api.get("profile");
      if (res.data) {
        setProfileData(res.data.name);
        console.log(res.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
  return loading ? (
    <Loading />
  ) : (
    isAuthenticated && (
      <Fragment>
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <div className="p-2">
              <img className="profile-pic" src={user.picture} alt={user.name} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">

            <Dashboard userName={profileData} />

          </div>
        </div>
      </Fragment>
    )
  );
};

export default Profile;
