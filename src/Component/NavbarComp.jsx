import React from "react";

import "../Styles/Navbar.css";

import MainNavComp from "./MainNavComp";

import HeaderComp from "./HeaderComp";

const NavbarComp = () => {
  return (
    <>
      <MainNavComp />

      <div
        className="DesktopResponsive"
        style={{ marginTop: "75px", zIndex: "100" }}
      >
        <HeaderComp />
      </div>
    </>
  );
};

export default React.memo(NavbarComp);
