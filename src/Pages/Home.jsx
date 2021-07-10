import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import pathImage from "../res/images/path.jpg"

const HomePage = () => {
  const { isAuthenticated, user } = useAuth0();
  return (

    <div>
      <div className="container-fluid ">
        <div className="row d-flex justify-content-center bg-light text-dark p-5">
          <div className="col-12">
            <h1 className="font-sand text-center text-dark">
              Welcome to Test Zen{isAuthenticated ? (`, ${user.nickname}`) : (" login to get started.")}
            </h1>
          </div>
        </div>
      </div>
      <div className="hero-container">
        <img src={pathImage} className="hero-img" alt="path" />;
      </div>
    </div>
  );
};

export default HomePage;
