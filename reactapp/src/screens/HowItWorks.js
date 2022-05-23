import React from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import { Link } from "react-router-dom";
import FooterPage from "../components/Footer";
import NavbarClub from "../components/NavbarClub";

function HowItWorks() {
  return (
    <div>
      <NavbarClub />
      <h1 className="center">How it works</h1>
      <FooterPage />
    </div>
  );
}

export default HowItWorks;
