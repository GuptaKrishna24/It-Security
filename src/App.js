import "./App.css";
import "./Styles/fontfamily.css";

import NavbarComp from "./Component/NavbarComp";
import { FooterComp } from "./Component/FooterComp";

import MainRoutes from "./Pages/MainRoutes";

function App() {
  return (
    <>
      <NavbarComp />
      <MainRoutes />
      <FooterComp />
    </>
  );
}

export default App;
