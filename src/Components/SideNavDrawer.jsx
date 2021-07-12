import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideNavDrawer = ({ links }) => {
  const [sideDrawerCollapsed, setSideDrawerCollapsed] = useState(false)
  return (
    <div>
      <div className="py-3  my-2 text-dark shadow side-drawer">
        <div className="">
          {
            sideDrawerCollapsed ?
              <div className="d-flex justify-content-between align-items-center px-4 action" onClick={() => setSideDrawerCollapsed(!sideDrawerCollapsed)}>
                <h3 className="d-inline align-items-center pr-3">Minimize</h3>
                <h3 className="d-inline text-dark" ><i class="fas fa-times "></i></h3>
              </div>
              :
              <div className="d-flex justify-content-center action" onClick={() => setSideDrawerCollapsed(!sideDrawerCollapsed)}>
                <h3 className="d-inline text-dark"><i className="fas fa-ellipsis-h"></i></h3>
              </div>
          }
          <hr className="bg-secondary m-0 mx-2 " />
        </div>
        <div className="text-primary p-2">
          {
            links && links.map((link, index) => {
              return (
                <div>
                  <Link key={index} className="nav-link" to={link.link}>
                    <div className="d-flex justify-content-between align-items-center">

                      {sideDrawerCollapsed ? <h3 className="d-inline pr-3"> {link.text}</h3> : <></>}

                      <i className={link.icon}></i>
                    </div>
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default SideNavDrawer;