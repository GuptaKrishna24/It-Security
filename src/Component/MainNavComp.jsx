import React, { lazy } from "react";
import { Navbar } from "react-bootstrap";

import newlogo from "../Images/Itnew11.webp"


const Sidebar = lazy(() => import("./Sidebar"));
const SearchSubComp = lazy(() => import("./SearchSubComp"));

const MainNavComp = () => {
 

  return (
    <div className="fixed-top nav-title">
      <Navbar
        collapseOnSelect
        expand="md"
        className="container justify-content-between"
      >
        <div className="impNav">
          <Sidebar />

          <div className="imgDiv">
            <Navbar.Brand>
              <a href="/">
                <img
                  className="MainLogo"
                  src={newlogo}
                  alt="Logo"
                  width="130"
                  height="60"
                  loading="lazy"
                />
              </a>
            </Navbar.Brand>
          </div>
        </div>

    
          <div className="Desktopresponsive">
            <SearchSubComp />
          </div>
     
      </Navbar>
    </div>
  );
};

export default React.memo(MainNavComp);
