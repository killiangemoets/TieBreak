import React, { useState, useEffect } from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import { Redirect } from "react-router-dom";
import FooterPage from "../components/Footer";
import NavbarClub from "../components/NavbarClub";

function HowItWorks() {
  const [token, setToken] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const storage1 = localStorage.getItem("type");
    if (JSON.parse(storage1) !== "club") setType(false);
    const storage = localStorage.getItem("token");
    if (storage) setToken(JSON.parse(storage));
    else setToken(false);
  }, []);

  if (token === false || type === false) {
    return <Redirect to="/club/signin" />;
  } else {
    return (
      <div>
        <NavbarClub />
        <h1 className="center">How it works</h1>
        <FooterPage />
      </div>
    );
  }
}

export default HowItWorks;
