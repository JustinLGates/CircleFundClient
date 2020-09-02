import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../axios";

const ContactUs = () => {
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-12">
          <h1>Contact us</h1>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
