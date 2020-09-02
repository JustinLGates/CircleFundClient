import React from "react";
import Signup from "../Components/Signup";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const HomePage = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="container-fluid ">
      <div className="row pt-5 d-flex justify-content-center bg-light text-dark p-5">
        <div className="col-12">
          <h1 className="font-sand">
            Our mission is to Make funding the easy part of yours.
          </h1>
          <br />
          <br />
          <br />
        </div>

        <div className="col-12 col-sm-10 col-lg-6 col-xl-5">
          <img
            className="w-100 rounded shadow"
            src="https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=2040"
            alt=""
          />
        </div>

        <div className="col-12 col-sm-10 col-lg-6 col-xl-5">
          <h3 className="font-sand text-left ">Funding at your fingertips</h3>
          <ul className="p-2 ml-2">
            <li>No cost to run a fundraiser</li>
            <li>Easy to share your campaign with your community</li>
            <li>Super easy to start</li>
            <li>No obligations</li>
          </ul>
          <p className="">
            Seting up a new fundraiser is free, quick, and easy. Get your
            orgonization funded today!
          </p>
          {isAuthenticated ? (
            <p className=" ">
              Looks like your loged in check out your{" "}
              <Link to="profile">profile</Link> to get started
            </p>
          ) : (
            <span className="">
              <Signup />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
