import React from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import { Link } from "react-router-dom";
import NavbarHomePageClub from "../components/NavbarHomePageClub";
import FooterPage from "../components/Footer";

function ClubSignIn() {
  return (
    <div>
      <NavbarHomePageClub />
      <h1 className="center">Sigin in as a club</h1>
      <FooterPage />
    </div>
  );
}

export default ClubSignIn;
