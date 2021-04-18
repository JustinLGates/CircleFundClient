import React from "react";
import "./App.css";
import { Nav } from "./Components/Nav";
import { Route } from "react-router-dom";
import About from "./Pages/AboutPage";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Footer from "./Components/Footer";
import ContactUs from "./Pages/Contactus";
import Project from "./Pages/Project";
import { useAuth0 } from "@auth0/auth0-react";
import { setBearer } from "./axios";
import { resetBearer } from "./axios";

function App() {
  //NOTE If the user is authenticated the beraer token will be set in axios and sent with all
  //requests.If they are not authenticated the token will be set to "".
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  if (isAuthenticated) {
    try {
      (async () => setBearer("Bearer " + (await getAccessTokenSilently())))();
    } catch (error) {
      console.error(error);
    }
  } else {
    resetBearer();
  }
  return (
    <div className="app">
      <Nav />
      <div className="body container-fluid bg-light">
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/about" exact component={About} />
        <Route path="/home" exact component={Home} />
        <Route path="/contactus" exact component={ContactUs} />
        <Route path="/project/:projectId" name="project" component={Project}/> 
      </div>
      <Footer />
    </div>
  );
}

export default App;
