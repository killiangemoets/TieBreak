import React, { useState, useEffect } from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";
import { GiTennisBall } from "react-icons/gi";

function NavbarClub(props) {
  const [profileMenu, setProfileMenu] = useState(false);
  const [logout, setLogout] = useState(false);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");

  function handleClick() {
    const navbar = document.querySelector(".navbarRight");
    const menuIcon = document.querySelector(".mobile-nav-menu-icon");
    const crossIcon = document.querySelector(".mobile-nav-cross-icon");
    navbar.classList.toggle("nav-open");
    menuIcon.classList.toggle("remove");
    crossIcon.classList.toggle("remove");
  }

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
    // console.log(JSON.parse(storage));
    if (storage) setUsername(JSON.parse(storage));
    const storage2 = localStorage.getItem("image");
    console.log(JSON.parse(storage2));
    if (storage2) setImage(JSON.parse(storage2));
  }, [props.refreshUser]);

  const handleLogout = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("type");
    localStorage.removeItem("image");
    setLogout(true);
  };
  if (logout) {
    return <Redirect to="/" />;
  } else {
    return (
      <nav className="navbar" onMouseLeave={() => closeProfileMenu()}>
        <Link to="/club/calendar" className="logoRedirect">
          <div className="navbarLeft ">
            {/* <img className="logoNavBar" src="../../ball1.png" alt="logo" /> */}
            <GiTennisBall className="nav-ball-icon" />
            <h1 className="titleNavBar">TieBreak </h1>
          </div>
        </Link>
        <div className="navbarRight">
          <Link to="/club/dashboard">
            <button className="button">Dashboard </button>
          </Link>
          <Link to="/club/calendar">
            <button className="buttonShowed">Calendar</button>
          </Link>
          <button
            className="button profile-btn"
            onMouseOver={() => openProfileMenu()}
          >
            <div className="navbar-img-div">
              {image && image.length > 0 ? (
                <img src={image} alt="club" className="navbar-img"></img>
              ) : (
                <h3>
                  No <br></br> image
                </h3>
              )}
            </div>
            {username.length !== 0 ? username : "Profile"}{" "}
            <FontAwesomeIcon className="chevron-icon" icon={faChevronDown} />{" "}
          </button>
        </div>
        <div
          className={
            profileMenu
              ? "profile-menu profile-menu-club"
              : "profile-menu profile-menu-club hidden"
          }
        >
          <Link to="/club/profile">
            <button className="button">Informations </button>
          </Link>
          <button className="button" onClick={() => handleLogout()}>
            Logout{" "}
          </button>
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
}

export default NavbarClub;
