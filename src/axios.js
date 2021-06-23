import Axios from "axios";

let base = window.location.host.includes("localhost")
  ? "http://localhost:5000/"
  : "/";

export const api = Axios.create({
  baseURL: base ,
  timeout: 30000,
  withCredentials: true,
});

export const setBearer = function (bearer) {
  api.defaults.headers.authorization = bearer;
};
export const resetBearer = function () {
  api.defaults.headers.authorization = "";
};
