import React from "react";
import "./App.css";
import { Nav } from "./Components/Nav";
import { Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { setBearer } from "./axios";
import { resetBearer } from "./axios";
import About from "./Pages/AboutPage";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Footer from "./Components/Footer";
import ContactUs from "./Pages/Contactus";
import Project from "./Pages/Project";
import NewTicket  from "./Pages/NewTicket"
import Ticket from "./Pages/Ticket";
import Reports from "./Pages/Reports"
import TestSuites from "./Pages/TestSuites"
import MangaeContributors from "./Pages/ManageContributors"
import NewTestSuite from "./Pages/NewTestSuite";

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
        <Route path="/home" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/contactus" exact component={ContactUs} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/projects/:projectId" name="project" component={Project}/> 
        <Route path="/project/:projectId/new/ticket" exact component={NewTicket}/>
        <Route path="/project/:projectId/ticket/:ticketId" name="ticket" component={Ticket}/>
        <Route path="/project/:projectId/new/testSuite" name="newtestSuite"  component={NewTestSuite}/>
        <Route path="/project/:projectId/testSuite/:suiteId" name="testSuite"  component={NewTestSuite}/>
        <Route path="/project/:projectId/testSuite" exact component={TestSuites}/>
        <Route path="/project/:projectId/reports" name="reports"  component={Reports}/>
        <Route path="/project/:projectId/manageContributors" name="manageContributors"  component={MangaeContributors}/>

      </div>
      <Footer />
    </div>
  );
}

export default App;
