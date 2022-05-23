import React from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import { Link } from "react-router-dom";
import NavbarHomePageClub from "../components/NavbarHomePageClub";
import FooterPage from "../components/Footer";

function CreateClubAccount() {
  return (
    <div>
      <NavbarHomePageClub />
      <h1 className="center">Create a club account</h1>
      <FooterPage />
    </div>
  );
}

export default CreateClubAccount;
