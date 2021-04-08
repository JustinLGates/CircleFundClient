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
            Maintain Track coverage flakes and communicate more effectivly.
          </h1>
        </div>
        <div className="col-12 col-sm-10 col-lg-6 col-xl-5 pt-lg-5 pt-2">
          <img
            className="w-100 rounded shadow"
            src="https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=2040"
            alt=""
          />
        </div>

        <div className="col-12 col-sm-10 col-lg-6 col-xl-5 pt-lg-5 pt-2">

          <p className="">
            Login to get started.
          </p>
          {isAuthenticated ? (
            <p className=" ">
              Looks like your loged in check out your{" "}
              <Link to="profile">profile</Link> to get started
              <br />
              <Logout />
            </p>


          ) : (
            <span className="">
              <Login />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
