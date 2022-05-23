import React, { useState, useEffect } from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function NavbarClub(props) {
  const [profileMenu, setProfileMenu] = useState(false);
  const [logout, setLogout] = useState(false);
  const [username, setUsername] = useState("");

  const openProfileMenu = function () {
    setProfileMenu(true);
    document.querySelector(".chevron-icon").style.transform = "rotateZ(180deg)";
  };
  const closeProfileMenu = function () {
    setProfileMenu(false);
    document.querySelector(".chevron-icon").style.transform = "rotateZ(0deg)";
  };

  useEffect(() => {
    const storage = localStorage.getItem("username");
    console.log(JSON.parse(storage));
    if (storage) setUsername(JSON.parse(storage));
  }, []);

  const handleLogout = function () {
    props.removeToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("type");
    setLogout(true);
  };
  if (logout) {
    return <Redirect to="/" />;
  } else {
    return (
      <nav className="navbar" onMouseLeave={() => closeProfileMenu()}>
        <Link to="/club/calendar" className="logoRedirect">
          <div className="navbarLeft ">
            <img className="logoNavBar" src="../../ball1.png" alt="logo" />
            <h1 className="titleNavBar">TieBreak </h1>
          </div>
        </Link>
        <div className="navbarRight">
          <Link to="/club/howitworks">
            <button className="button">How it works </button>
          </Link>
          <Link to="/club/calendar">
            <button className="buttonShowed">Calendar</button>
          </Link>
          <button
            className="button profile-btn"
            onMouseOver={() => openProfileMenu()}
          >
            {username.length !== 0 ? username : "Profile"}{" "}
            <FontAwesomeIcon className="chevron-icon" icon={faChevronDown} />{" "}
          </button>
        </div>
        <div className={profileMenu ? "profile-menu" : "profile-menu hidden"}>
          <Link to="/club/profile">
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

export default connect(null, mapDispatchToProps)(NavbarClub);
