import React, { useRef, useState, useEffect } from "react";
import "../stylesheets/general.css";
import "../stylesheets/clubMainPage.css";

import { Link } from "react-router-dom";
import NavbarHomePageClub from "../components/NavbarHomePageClub";
import FooterPage from "../components/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function ClubMain() {
  const scrollButton = useRef(null);
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  function hideNavBar() {
    const navbar = document.querySelector(".navbarRight");
    const menuIcon = document.querySelector(".mobile-nav-menu-icon");
    const crossIcon = document.querySelector(".mobile-nav-cross-icon");
    navbar.classList.remove("nav-open");
    menuIcon.classList.remove("remove");
    crossIcon.classList.add("remove");
  }

  return (
    <div>
      <NavbarHomePageClub />
      <div className="allPage" onClick={() => hideNavBar()}>
        <div className="club-banner">
          <div className="header-title">
            <h1 id="title-club-page">TieBreak</h1>
          </div>
          <div className="header-description">
            <p>The must-have tennis management tool</p>
          </div>
          <div>
            <button
              className="club-chevron-btn"
              onClick={() => scrollToSection(scrollButton)}
            >
              <FontAwesomeIcon
                className="club-chevron-icon"
                icon={faChevronDown}
              />
            </button>
          </div>
        </div>

        <div className="after-banner-space" ref={scrollButton}></div>

        <div className="general-explanation-container">
          <div className="general-explanation">
            <div className="card-club-page-odd">
              <p className="text-description">
                Our vision is to increase your business by using the Internet
                power
              </p>
            </div>

            <div className="card-club-page-even">
              <p className="text-description">
                Save time by using an automatic courts rental system!
              </p>
            </div>

            <div className="card-club-page-odd card-center">
              <p className="text-description">
                Be more visible thanks to TieBreak
              </p>
            </div>

            <div className="card-club-page-even">
              <p className="text-description">
                Being visible nowadays is more than an asset. It’s a need!
              </p>
            </div>

            <div className="card-club-page-odd">
              <p className="text-description">
                We are to help you in your management
              </p>
            </div>
          </div>
        </div>

        <div className="after-banner-space"> </div>

        <div className="more-precisely-title">
          <h3 className="title-more-precisely"> More Precisely</h3>
        </div>

        <div className="more-precisely-card">
          <div className="more-precisely-left">
            <h2 className="more-precisly-card-header">
              {" "}
              Benefits on Your side{" "}
            </h2>

            <div>
              <p className="more-precisely-number"> 1 </p>

              <p className="more-precisely-header"> Easy Calendar Management</p>

              <p className="more-precisely-description">
                You can close/open slots as you need to.
              </p>
            </div>

            <div>
              <p className="more-precisely-number"> 2 </p>

              <p className="more-precisely-header"> Easy Payment</p>

              <p className="more-precisely-description">
                Get a weekly payment on your account for all the reservations.
              </p>
            </div>

            <div>
              <p className="more-precisely-number"> 3 </p>

              <p className="more-precisely-header">
                {" "}
                Get Statistics About Your Club
              </p>

              <p className="more-precisely-description">
                A fabulous dashboard will allow you to get more information
                about your club rental.
              </p>
            </div>
          </div>

          <div className="more-precisely-rigth">
            <h2 className="more-precisly-card-header">
              {" "}
              Benefits on your customer’s side{" "}
            </h2>

            <div>
              <p className="more-precisely-number"> 1 </p>

              <p className="more-precisely-header"> Easy Calendar Management</p>

              <p className="more-precisely-description">
                Your customers can now easily rent a court. They go to the site,
                choose an availability and can play!
              </p>
            </div>

            <div>
              <p className="more-precisely-number"> 2 </p>

              <p className="more-precisely-header"> Easy Paiement</p>

              <p className="more-precisely-description">
                Customers can pay online. It’s much more customer friendly.
              </p>
            </div>

            <div>
              <p className="more-precisely-number"> 3 </p>

              <p className="more-precisely-header"> Get Your History</p>

              <p className="more-precisely-description">
                Every customer will be able to consult their reservations. This
                include future reservations, but also past reservations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FooterPage />
    </div>
  );
}

export default ClubMain;
