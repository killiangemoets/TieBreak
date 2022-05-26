import React from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function NavbarHomePageClub() {
  function handleClick() {
    const navbar = document.querySelector(".navbarRight");
    const menuIcon = document.querySelector(".mobile-nav-menu-icon");
    const crossIcon = document.querySelector(".mobile-nav-cross-icon");
    navbar.classList.toggle("nav-open");
    menuIcon.classList.toggle("remove");
    crossIcon.classList.toggle("remove");
  }
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

      <button className="btn-mobile-nav" onClick={() => handleClick()}>
        <FontAwesomeIcon className="mobile-nav-menu-icon" icon={faBars} />
        <FontAwesomeIcon
          className="mobile-nav-cross-icon remove"
          icon={faXmark}
        />
      </button>
    </nav>
  );
}

export default NavbarHomePageClub;
