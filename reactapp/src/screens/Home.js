import React, { useRef, useState, useEffect } from "react";
import NavbarHomePage from "../components/NavbarHomePage";
import FooterPage from "../components/Footer";
import "../stylesheets/queries.css";
import "../stylesheets/homepage.css";
import "../stylesheets/general.css";
import { Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [token, setToken] = useState("");
  const [type, setType] = useState("");

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

  useEffect(() => {
    localStorage.removeItem("currentReservation");
    const storage = localStorage.getItem("token");
    if (storage) setToken(JSON.parse(storage));
    const storage2 = localStorage.getItem("type");
    if (storage2) setType(JSON.parse(storage2));
  }, []);

  if (token !== "" && type === "player") {
    return <Redirect to="/games" />;
  } else if (token !== "" && type === "club") {
    return <Redirect to="/club/calendar" />;
  } else {
    return (
      <div>
        <NavbarHomePage />
        <div className="allPage">
          <div className="header margin-top" onClick={() => hideNavBar()}>
            <div className="details-banner">
              <div className="header-title">
                <h1 id="title-main-page">
                  <span> Tie</span>
                  <span>Break</span>
                </h1>
              </div>
              <div>
                <p className="header-description-main-page">
                  The ultimate website to book your tennis session!
                </p>
              </div>
              <div className="homePageButton">
                <a href="/signup">
                  {" "}
                  <button className="yellowButton header-btn">
                    {" "}
                    Get Started
                  </button>{" "}
                </a>
                <button
                  onClick={() => scrollToSection(scrollButton)}
                  className="yellowButton yellowButton-secondary header-btn"
                >
                  <p className="learn-more">Learn More </p>
                  <FontAwesomeIcon className="arrow-icon" icon={faArrowDown} />
                </button>
              </div>
            </div>
          </div>
          <div className="section-intermediaire"></div>
          <div className="middle-page">
            <div className="howItWorks-section" ref={scrollButton}>
              <div className="titleTexts">
                <div className="title-howItWorks">
                  <p> How it Works </p>
                </div>
                <div className="text-howItWorks">
                  <p>
                    {" "}
                    Finding an available tennis court has never been so easy !{" "}
                  </p>
                </div>
              </div>

              <div className="box-section">
                <div className="card">
                  <p className="TitleCardScore"> 15-0</p>
                  <img
                    src="../../calendar.png"
                    alt="calendar"
                    className="home-img"
                  ></img>
                  <p className="DescriptionCardOdd">
                    Choose the perfect time in the calendar!
                  </p>{" "}
                  <br />
                  <span className="hidden-text"> test</span>
                </div>

                <div className=" cardMiddle">
                  <p className="TitleCardScore"> 30-0</p>
                  <img src="../../map.png" alt="map" className="home-img"></img>
                  <p className="DescriptionCardEven">
                    Choose the perfect <br />
                    tennis club!
                  </p>{" "}
                  <br />
                  <span className="hidden-text"> test</span>
                </div>

                <div className=" card">
                  <p className="TitleCardScore"> 40-0</p>

                  <img
                    src="../../credit-card.png"
                    alt="pay"
                    className="home-img"
                  ></img>

                  <p className="DescriptionCardOdd">
                    <span className="hidden-text"> test</span>
                    <br />
                    Confirm & Play <br />
                    <span className="hidden-text"> test</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="gameSetMatchButton">
              <a href="/signup">
                <button className="yellowButton yellowButton-final">
                  {" "}
                  GET STARTED NOW!
                </button>
              </a>
            </div>
          </div>
        </div>

        <FooterPage />
      </div>
    );
  }
}

export default Home;
