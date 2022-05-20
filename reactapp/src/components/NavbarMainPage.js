import React, { useState } from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function NavbarMainPage(props) {
  const [profileMenu, setProfileMenu] = useState(false);
  const [logout, setLogout] = useState(false);

  const openProfileMenu = function () {
    setProfileMenu(true);
    document.querySelector(".chevron-icon").style.transform = "rotateZ(180deg)";
  };
  const closeProfileMenu = function () {
    setProfileMenu(false);
    document.querySelector(".chevron-icon").style.transform = "rotateZ(0deg)";
  };

  const handleLogout = function () {
    // props.removeToken("");
    setLogout(true);
  };
  if (logout) {
    return <Redirect to="/" />;
  } else {
    return (
      <nav className="navbar" onMouseLeave={() => closeProfileMenu()}>
        <a href="/games" className="logoRedirect">
          <div className="navbarLeft ">
            <img className="logoNavBar" src="../../ball1.png" alt="logo" />
            <h1 className="titleNavBar">TieBreak </h1>
          </div>
        </a>
        <div className="navbarRight">
          <Link to="/games">
            <button className="button">Games </button>
          </Link>
          <Link to="/news">
            <button className="button">News</button>
          </Link>
          <Link to="/reservation">
            <button className="buttonShowed">Reservation </button>
          </Link>
          <button
            className="button profile-btn"
            onMouseOver={() => openProfileMenu()}
          >
            Profile{" "}
            <FontAwesomeIcon className="chevron-icon" icon={faChevronDown} />{" "}
          </button>
        </div>
        <div className={profileMenu ? "profile-menu" : "profile-menu hidden"}>
          <Link to="/profile">
            <button className="button">Informations </button>
          </Link>
          <button className="button" onClick={() => handleLogout()}>
            Logout{" "}
          </button>
        </div>
      </nav>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeToken: function () {
      dispatch({ type: "removeToken" });
    },
  };
}

export default connect(null, mapDispatchToProps)(NavbarMainPage);
