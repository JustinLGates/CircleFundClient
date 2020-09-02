import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const SignupButton = () => {
  const { loginWithPopup } = useAuth0();
  return (
    <button
      onClick={() =>
        loginWithPopup({
          screen_hint: "signup",
        })
      }
      className="btn btn-primary"
    >
      Sign Up
    </button>
  );
};

export default SignupButton;
