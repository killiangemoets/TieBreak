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
                  <h1 id="title" > 
                    <span > Tie</span> 
                    <span >Break</span>
                    </h1>
                </div>
                <div>
                    <p className="header-description">
                      The ultimate website to book 
                      your tennis session!
                    </p>
                </div>
                <div className="homePageButton">
                    <a href="/signup">
                      {" "}
                      <button className="yellowButton btn-header">
                        {" "}
                        Get Started
                      </button>{" "}
                    </a>
                    <button
                      onClick={() => scrollToSection(scrollButton)}
                      className="yellowButton yellowButton-secondary btn-header"
                    >
                      <p>Learn More </p>
                      <FontAwesomeIcon className="arrow-icon" icon={faArrowDown} />
                    </button>
                </div>
              </div> 
            </div>
            <div className="section-intermediaire"></div>
            <div className="middle-page">
            <div className="howItWorks-section" ref={scrollButton}>
          <div className="titleTexts">
            <div className="text-howItWorks">
              <p>
                {" "}
                Finding an available tennis court has never been so easy !{" "}
              </p>
            </div>
            <div className="title-howItWorks">
              <p> How it Works </p>
            </div>
          </div>

          <div className="box-section">
            
            <div className=" card">
                
                  
                    <p className="TitleCardScore"> 15-0</p>
                    <img
                      src="../../calendar.png"
                      alt="calendar"
                      className="home-img"
                    ></img>
                    <p className="DescriptionCardOdd">
                      Chose the perfect time in 
                      the calendar!
                    </p>
                  
                  
                  
                
            </div>

            <div className=" cardMiddle">
                
              <p className="TitleCardScore"> 30-0</p>
                  
                    <img
                      src="../../map.png"
                      alt="map"
                      className="home-img"
                    ></img>
                  
                  
                    <p className="DescriptionCardEven">
                    Chose the perfect <br />
                    tennis court!
                    </p>
                  
                
            </div>

            <div className=" card">
                    
                
                    <p className="TitleCardScore"> 40-0</p>
                  
                    <img
                      src="../../credit-card.png"
                      alt="pay"
                      className="home-img"
                    ></img>
                  
                    <p className="DescriptionCardOdd">
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
{/*         
          <div className="header margin-top"onClick={() => hideNavBar()}>
            
              <div className="leftContainer">
                <div className="header-title">
                  <img
                    className="ball-in-title"
                    src="../../ball1.png"
                    alt="ball"
                  />
                  <h1 id="title"> TieBreak</h1>
                </div>
                <div>
                  <p className="header-description">
                    The ultimate website to book <br />
                    your tennis session!
                  </p>
                </div>
                <div className="homePageButton">
                  <a href="/signup">
                    {" "}
                    <button className="yellowButton btn-header">
                      {" "}
                      Get Started
                    </button>{" "}
                  </a>
                  <button
                    onClick={() => scrollToSection(scrollButton)}
                    className="yellowButton yellowButton-secondary btn-header"
                  >
                    <p>Learn More</p>
                    <FontAwesomeIcon className="arrow-icon" icon={faArrowDown} />
                  </button>
                </div>
              </div>
              
            </div>
           
        <div className="container" >
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
            <div className="boxTemplate">
              <div className="boxText">
                <div className="boxText-title">
                  <p> 15-0</p>
                </div>
                <div className="boxText-description">
                  <p>
                    Chose the perfect time in <br />
                    the calendar!
                  </p>
                </div>
              </div>
              <div className="boxElement">
                <img
                  src="../../calandar.png"
                  alt="calendar"
                  className="home-img"
                ></img>
              </div>
            </div>
            <hr className="divideBoxes"></hr>
            <div className="boxTemplate boxTemplate2">
              <div className="boxElement boxElement2">
                <img
                  src="../../map.jpeg"
                  alt="calendar"
                  className="home-img"
                ></img>
              </div>
              <div className="boxText">
                <div className="boxText-title">
                  <p> 30-0</p>
                </div>
                <div className="boxText-description">
                  <p>
                    Chose the perfect <br />
                    tennis court!
                  </p>
                </div>
              </div>
            </div>
            <hr className="divideBoxes"></hr>
            <div className="boxTemplate boxTemplate-last">
              <div className="boxText">
                <div className="boxText-title">
                  <p> 40-0</p>
                </div>
                <div className="boxText-description">
                  <p>Confirm & Pay</p>
                </div>
              </div>
              <div className="boxElement">
                <img
                  className="boxElementMaria"
                  src="../../cf25de0e2cacb54159d6f51fa00e042b.png"
                  alt="calendar"
                ></img>
              </div>
            </div>
            <div>
              <h2 className="final-title">Game, Set & Match!</h2>
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
      </div> */}
   
export default Home;
