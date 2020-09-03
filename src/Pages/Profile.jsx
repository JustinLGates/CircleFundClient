import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api, setBearer } from "../axios";
import Logout from "../Components/Logout";
import Loading from "../Components/Loading";
import Dashboard from "../Components/Dashboard";
import ProfileForm from "../Components/ProfileForm";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  // get the profile data when page loads and set state of the profiledata
  useEffect(() => {
    getProfileData();
  }, []);

  const [profileData, setProfileData] = useState({
    Name: null,
    Email: null,
    PhoneNumber: null,
    LogoUrl: null,
    City: null,
    State: null,
    Address: null,
  });
  const [loading, setLoading] = useState(true);

  async function getProfileData() {
    setBearer("Bearer " + (await getAccessTokenSilently()));
    try {
      let res = await api.get("organization");
      if (res.data) {
        const {
          name,
          email,
          phoneNumber,
          logoUrl,
          city,
          state,
          address,
        } = res.data;
        setProfileData({
          Name: name,
          Email: email,
          PhoneNumber: phoneNumber,
          LogoUrl: logoUrl,
          City: city,
          State: state,
          Address: address,
        });
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
            <div className="">
              <Logout />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {profileData ? (
              <Dashboard ProfileData={profileData} />
            ) : (
              <ProfileForm />
            )}
          </div>
        </div>
      </Fragment>
    )
  );
};

export default Profile;
