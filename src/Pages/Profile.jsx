import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../axios";
import Logout from "../Components/Logout";
import Loading from "../Components/Loading";
import ProflieForm from "../Components/ProfileForm";
import ProfileForm from "../Components/ProfileForm";
const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  // get the profile data when page loads

  useEffect(() => {
    let wait = true;
    if (isAuthenticated) {
    }
    getProfileData(wait);
  }, []);

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getProfileData(wait) {
    if (wait) {
      await getAccessTokenSilently();
    }
    try {
      let res = await api.get("organization");
      if (res.data) {
        setProfileData(res.data);
      } else {
        console.log("nodata...");
      }
      console.log(res.data.length);
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
            <div className="d-flex justify-content-center align-items-center">
              <img className="profile-pic" src={user.picture} alt={user.name} />
              <h2 className="d-inline p-2">{user.nickname}</h2>
            </div>
            <div className="">
              <Logout />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {profileData ? <p>data :)</p> : <ProfileForm />}
          </div>
        </div>
      </Fragment>
    )
  );
};

export default Profile;
