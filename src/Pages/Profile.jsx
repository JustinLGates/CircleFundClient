import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../axios";
import Logout from "../Components/Logout";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  // get the profile data when page loads
  useEffect(() => {
    getProfileData();
  }, []);

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getProfileData() {
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
    <span>....Loading</span>
  ) : (
    isAuthenticated && (
      <div className="d-flex flex-column justify-content-center align-items-center pt-3 mt-2">
        <div className="">
          <img src={user.picture} alt={user.name} />
          <h2>{user.nickname}</h2>
          <Logout />
        </div>
      </div>
    )
  );
};

export default Profile;
