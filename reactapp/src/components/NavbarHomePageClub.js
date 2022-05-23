import React from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import { Link } from "react-router-dom";

function NavbarHomePageClub() {
  return (
    <nav className="navbar">
      <a href="/" className="logoRedirect">
        <div className="navbarLeft">
          <img className="logoNavBar" src="../../ball1.png" alt="logo" />
          <h1 className="titleNavBar">TieBreak </h1>
        </div>
      </a>
      <div className="navbarRight">
        <a href="/" className="link-login">
          <button className="button">I'M A PLAYER </button>
        </a>
        <a href="/club/signin" className="link-login">
          <button className="button">SIGN IN </button>
        </a>
        <a href="/club/signup">
          <div>
            <button className="buttonShowed">SIGN UP </button>
          </div>
        </a>
      </div>
    </nav>
  );
}

export default NavbarHomePageClub;
