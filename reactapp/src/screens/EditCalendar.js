import React from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import { Link } from "react-router-dom";
import FooterPage from "../components/Footer";
import NavbarClub from "../components/NavbarClub";

function EditCalendar() {
  return (
    <div>
      <NavbarClub />
      <h1 className="center">Edit Calendar</h1>
      <FooterPage />
    </div>
  );
}

export default EditCalendar;
