import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const { isAuthenticated, user } = useAuth0();
  return (
    <div className="container-fluid ">
      <div className="row pt-5 d-flex justify-content-center bg-light text-dark p-5">
        <div className="col-12">
          <h1 className="font-sand text-center">
            Welcome to Test Zen{isAuthenticated ? (`, ${user.nickname}`) : (" login to get started.")}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
