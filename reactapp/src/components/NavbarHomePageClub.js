import React from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { GiTennisBall } from "react-icons/gi";

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
      <Link to="/" className="logoRedirect">
        <div className="navbarLeft">
          {/* <img className="logoNavBar" src="../../ball1.png" alt="logo" /> */}
          <GiTennisBall className="nav-ball-icon" />
          <h1 className="titleNavBar">TieBreak </h1>
        </div>
      </Link>
      <div className="navbarRight">
        <Link to="/" className="link-login">
          <button className="button">I'm a player </button>
        </Link>
        <Link to="/club/signin" className="link-login">
          <button className="button">Sign in </button>
        </Link>
        <Link to="/club/signup">
          <div>
            <button className="buttonShowed">Sign up </button>
          </div>
        </Link>
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
