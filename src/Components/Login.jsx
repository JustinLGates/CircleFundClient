import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { setBearer } from "../axios";
import { useHistory } from "react-router-dom";

const LoginButton = () => {

  let history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const setBearerToken = async () => {
    setBearer("Bearer " + (await getAccessTokenSilently()));
  };

  const { loginWithPopup } = useAuth0();

  const loginFlow = async () => {
    await loginWithPopup().then(setBearerToken)
    await history.push('/profile')
  }

  return (
    <button
      onClick={() => loginFlow()}
      className="btn btn-success"
    >
      Log In
    </button>
  );
};

export default LoginButton;
