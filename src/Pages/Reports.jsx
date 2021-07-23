import React, { useEffect, useState } from "react";
import SideNavDrawer from "../Components/SideNavDrawer"
import { useParams } from "react-router-dom"
import { Doughnut } from "react-chartjs-2"
import { api, setBearer } from "../axios";
import { useAuth0 } from "@auth0/auth0-react";

const Reports = () => {

  useEffect(() => {
    gernerateReport()
  }, [])

  const { projectId } = useParams();

  const { getAccessTokenSilently } = useAuth0();

  const [totalTickets, setTotalTickets] = useState([]);
  const [iosTickets, setIosTickets] = useState([]);
  const [androidTickets, setAndroidTickets] = useState([]);
  const [webTickets, setWebTickets] = useState([]);

  const [iosNew, setIosNew] = useState();
  const [iosComplete, setIosComplete] = useState();
  const [iosBlocked, setIosBlocked] = useState();
  const [iosInvalid, setIosInvalid] = useState();
  const [iosUnable, setIosUnable] = useState();
  const [iosInProgress, setIosInProgress] = useState();


  const [androidNew, setAndroidNew] = useState();
  const [androidComplete, setAndroidComplete] = useState();
  const [androidBlocked, setAndroidBlocked] = useState();
  const [androidInvalid, setAndroidInvalid] = useState();
  const [androidUnable, setAndroidUnable] = useState();
  const [androidInProgress, setAndroidInProgress] = useState();

  const [webNew, setWebNew] = useState();
  const [webComplete, setWebComplete] = useState();
  const [webBlocked, setWebBlocked] = useState();
  const [webInvalid, setWebInvalid] = useState();
  const [webUnable, setWebUnable] = useState();
  const [webInProgress, setWebInProgress] = useState();



  const [loading, setLoading] = useState(true);

  const reportLinks = [{ link: `/projects/${projectId}`, text: "Project", icon: "fas fa-arrow-circle-left" }]

  const dataLabelsAndroid = [
    `new ${androidNew}`,
    `Complete ${androidComplete}`,
    `In Progress ${androidInProgress}`,
    `Blocked ${androidBlocked}`,
    `Unable ${androidUnable}`,
    `Invalid ${androidInvalid}`
  ]

  const dataLabelsIos = [
    `new ${iosNew}`,
    `Complete ${iosComplete}`,
    `In Progress ${iosInProgress}`,
    `Blocked ${iosBlocked}`,
    `Unable ${iosUnable}`,
    `Invalid ${iosInvalid}`
  ]

  const dataLabelsWeb = [
    `new ${webNew}`,
    `Complete ${webComplete}`,
    `In Progress ${webInProgress}`,
    `Blocked ${webBlocked}`,
    `Unable ${webUnable}`,
    `Invalid ${webInvalid}`
  ]

  const dataLabels = [
    `new ${androidNew + webNew + iosNew}`,
    `Complete ${androidComplete + webComplete + iosComplete}`,
    `In Progress ${androidInProgress + webInProgress + iosInProgress}`,
    `Blocked ${androidBlocked + webBlocked + iosBlocked}`,
    `Unable ${androidUnable + webUnable + iosUnable}`,
    `Invalid ${androidInvalid + webInvalid + iosInvalid}`
  ]

  const chartBackgroundColors = [
    'rgb(102, 161, 255)',
    'rgb(125, 232, 125)',
    'rgb(151, 240, 226)',
    'rgb(252, 255, 171)',
    'rgb(255, 143, 94)',
    'rgb(255, 99, 99)'
  ]

  const data = {

    labels: dataLabels,
    datasets: [{
      label: 'TotalTestCases',
      data: [
        iosNew + androidNew + webNew,
        iosComplete + androidComplete + webComplete,
        iosInProgress + androidInProgress + webInProgress,
        iosBlocked + androidBlocked + webBlocked,
        iosUnable + androidUnable + webUnable,
        iosInvalid + androidInvalid + webInvalid
      ],
      backgroundColor: chartBackgroundColors,
      hoverOffset: 4
    }]
  };

  const dataAndroid = {
    labels: dataLabelsAndroid,
    datasets: [{
      label: 'Android Test Cases',
      data: [
        androidNew,
        androidComplete,
        androidInProgress,
        androidBlocked,
        androidUnable,
        androidInvalid
      ],
      backgroundColor: chartBackgroundColors,
      hoverOffset: 4
    }]
  };

  const dataIos = {
    labels: dataLabelsIos,
    datasets: [{
      label: 'iOS Test Cases',
      data: [
        iosNew,
        iosComplete,
        iosInProgress,
        iosBlocked,
        iosUnable,
        iosInvalid
      ],
      backgroundColor: chartBackgroundColors,
      hoverOffset: 4
    }]
  };

  const dataWeb = {
    labels: dataLabelsWeb,
    datasets: [{
      label: 'Web Test Cases',
      data: [
        webNew,
        webComplete,
        webInProgress,
        webBlocked,
        webUnable,
        webInvalid
      ],
      backgroundColor: chartBackgroundColors,
      hoverOffset: 4
    }]
  };

  const config = {
    type: 'doughnut'
  };

  const gernerateReport = async () => {

    setBearer("Bearer " + (await getAccessTokenSilently()));

    try {
      let res = await api.get(`project/${projectId}/ticket`);
      console.log(res.data)
      setTotalTickets(res.data);

      filterByStatus(res.data);

    } catch (error) {
      console.log(error)
    }

    setLoading(false);
  }

  const filterByStatus = (tickets) => {


    let iosTickets = filterPlatform(tickets, "ios")
    let androidTickets = filterPlatform(tickets, "android")
    let webTickets = filterPlatform(tickets, "web")

    setIosTickets(iosTickets);
    setAndroidTickets(androidTickets);
    setWebTickets(webTickets);

    setIosNew(filterStatus(iosTickets, ("new")))
    setIosComplete(filterStatus(iosTickets, ("complete")));
    setIosBlocked(filterStatus(iosTickets, ("blocked")));
    setIosInvalid(filterStatus(iosTickets, ("invalid")));
    setIosUnable(filterStatus(iosTickets, ("unable")));
    setIosInProgress(filterStatus(iosTickets, ("inProgress")));

    setAndroidNew(filterStatus(androidTickets, ("new")))
    setAndroidComplete(filterStatus(androidTickets, ("complete")))
    setAndroidBlocked(filterStatus(androidTickets, ("blocked")))
    setAndroidInvalid(filterStatus(androidTickets, ("invalid")))
    setAndroidUnable(filterStatus(androidTickets, ("unable")))
    setAndroidInProgress(filterStatus(androidTickets, ("inProgress")))

    setWebNew(filterStatus(webTickets, ("new")))
    setWebComplete(filterStatus(webTickets, ("complete")))
    setWebBlocked(filterStatus(webTickets, ("blocked")))
    setWebInvalid(filterStatus(webTickets, ("invalid")))
    setWebUnable(filterStatus(webTickets, ("unable")))
    setWebInProgress(filterStatus(webTickets, ("inProgress")))
    console.log()
  }

  const filterStatus = (arr, status) => {
    return arr.filter(elem => elem.status === status).length

  }

  const filterPlatform = (arr, platform) => {
    return arr.filter(elem => elem.platform === platform)
  }

  return (
    <div className="row">
      <div className="col-12 d-flex">

        <SideNavDrawer links={reportLinks} />

        <div className="p-4 row">
          <div className="col-12">
            <h2>Reports</h2>
          </div>

          {loading ? <loading /> :
            <div className="col-12">
              <div className="row">
                <div className="col-11 m-auto col-lg-5 m-auto">
                  <div className="boxed-2 m-2 p-2">
                    <h3>Over all total: {totalTickets.length}</h3>
                    <div className=" p-4">
                      <Doughnut data={data} config={config} />
                    </div>
                  </div>
                </div>

                <div className="col-11 m-auto col-lg-5 m-auto ">
                  <div className="boxed-2 m-2 p-2 my-3">
                    <h3>Web total: {webTickets.length}</h3>
                    <div className=" p-4">
                      <Doughnut data={dataWeb} config={config} />
                    </div>
                  </div>

                </div>

                <div className="col-11 m-auto col-lg-5 m-auto">
                  <div className="boxed-2 m-2 p-2 my-3">
                    <h3>iOS total {iosTickets.length}</h3>
                    <div className=" p-4">
                      <Doughnut data={dataIos} config={config} />
                    </div>
                  </div>

                </div>

                <div className="col-11 m-auto col-lg-5 m-auto">
                  <div className="boxed-2 m-2 p-2 my-3">                  <h3>Android total: {androidTickets.length}</h3>
                    <div className="p-4">
                      <Doughnut data={dataAndroid} config={config} />
                    </div>
                  </div>
                </div>


              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Reports;