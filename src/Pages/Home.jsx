import React from "react";
import Login from "../Components/Login";
import { Link } from "react-router-dom";
import Logout from "../Components/Logout";
import { useAuth0 } from "@auth0/auth0-react";
const HomePage = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="container-fluid ">
      <div className="row pt-5 d-flex justify-content-center bg-light text-dark p-5">
        <div className="col-12">
          <h1 className="font-sand text-center">
            Welcome to Test Zen
          </h1>
        </div>


        <div className="col-12 col-sm-10 col-lg-6 col-xl-5 pt-lg-5 pt-2">


          {isAuthenticated ? (
            <p className=" d-inline ">
              Looks like your authenticated
              <Link to="profile"> GET STARTED.</Link><span className="pr-5"></span>
              <Logout />
            </p>


          ) : (<div>

            <p className="">
              Login to get started.
          </p>
            <span className="">
              <Login />
            </span>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
