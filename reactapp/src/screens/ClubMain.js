import React from "react";
import "../stylesheets/general.css";
import "../stylesheets/clubMainPage.css";

import { Link } from "react-router-dom";
import NavbarHomePageClub from "../components/NavbarHomePageClub";
import FooterPage from "../components/Footer";

function ClubMain() {
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
        <div className="allPage">
          <div className="club-banner">
            <div className="header-title">
              <h1 id="title">TieBreak</h1>
            </div>
            <div className="header-description">
              <p>The must-have tennis management app</p>
            </div>
          </div>
          <div className="after-banner-space">
          </div>

          <div className="general-explanation">
            <div className="text-explanation">
              <p className="text">
                  Our vision is to increase your business by using the internet power. 
                  <br/>
                  Spare time by using an automatic courts rental system.
                  <br/>
                  Be more visible thanks to TieBreak.
                  <br/>
                  Being visible nowadays is more than an asset. It’s just a need!
                  <br/>
                  And here we are to help you in that way ! 
                  <br /> 
                  More precisely :{" "}
              </p>
            </div>
          </div>

          
        


    
        </div>
    
      
      <FooterPage />
    </div>

  );
}

export default ClubMain;
      
      
      
      
      
      
      
      
      /*       
      <div
        className="margin-top club-main-section"
        onClick={() => hideNavBar()}
      >
        <div className="margin-top left-section container">
          
          <img
            className="photo-club"
            src="../../TennisManagement.png"
            alt="ball"
          />
         
          <div className="main-title">
            <h1>
              {" "}
              Welcome on the club <br />
              management Page
            </h1>
          </div>
        </div>

        <div className="MiddLine"></div>

        <div className="right-section container">
          <div className="UpperText">
            <div className="title-right-section">
              <h1> How does it work? </h1>
            </div>
            <div className="text-right-section ">
              <p>
                Many clubs do not use the power of the internet to be more
                profitable. Our vision is to increase your business. Most of the
                clubs are handling the reservations by phone, by email, or on
                their own website. This is asking a lot of time to ensure a good
                management of the courts rental.
                <br />
                <br />
                By using TieBreak, your visibility will be increased and the
                occupation rate of your courts will be significantly improved.
                Being visible nowadays is more than an asset. It’s just a need!
                And here we are to help you in that way ! More precisely :{" "}
              </p>
            </div>
          </div>

          <div className="body-text-section">
            <div className="body-left-text-section">
              <div className="body-text-section-title">
                <h2>Benefits on Your side</h2>
              </div>
              <div className="step-club">
                <div className="body-text-section-number">
                  <p> 1.</p>
                </div>
                <div className="body-text-section-underlined-titel">
                  <p>Easy Calendar management</p>
                </div>
                <div className="body-text-section-text">
                  <p>You can close/open slots as it suits your the best.</p>
                </div>
              </div>

              <div className="step-club">
                <div className="body-text-section-number">
                  <p> 2.</p>
                </div>
                <div className="body-text-section-underlined-titel">
                  <p>Easy Paiement</p>
                </div>
                <div className="body-text-section-text">
                  <p>
                    Get one weekly paiement on your account for all the
                    bookings.{" "}
                  </p>
                </div>
              </div>

              <div className="step-club">
                <div className="body-text-section-number">
                  <p> 3.</p>
                </div>
                <div className="body-text-section-underlined-titel">
                  <p>Get some stats about your club</p>
                </div>
                <div className="body-text-section-text">
                  <p>
                    We’ll provide you with a fabulous dashboard. You’ll be able
                    to get more informtion about your club’s rental.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="body-middle-line-section"></div>

            <div className="body-right-text-section">
              <div className="body-text-section-title">
                <h2>Benefits on your customer’s side</h2>
              </div>
              <div className="step-club">
                <div className="body-text-section-number">
                  <p> 1.</p>
                </div>
                <div className="body-text-section-underlined-titel">
                  <p>Easy Calendar management</p>
                </div>
                <div className="body-text-section-text">
                  <p>
                    Your customer’s can now easily rent a court. They go on the
                    website, select a timeframe and they can play!{" "}
                  </p>
                </div>
              </div>

              <div className="step-club">
                <div className="body-text-section-number">
                  <p> 2.</p>
                </div>
                <div className="body-text-section-underlined-titel">
                  <p>Easy Paiement</p>
                </div>
                <div className="body-text-section-text">
                  <p>
                    Customer’s can pay online. It’s much more customer’s
                    friendly.{" "}
                  </p>
                </div>
              </div>

              <div className="step-club">
                <div className="body-text-section-number">
                  <p> 3.</p>
                </div>
                <div className="body-text-section-underlined-titel">
                  <p>Get your history</p>
                </div>
                <div className="body-text-section-text">
                  <p>
                    {" "}
                    Every customer will be able to consult their bookings. This
                    include future reservation’s, but they can also consult the
                    past one’s.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */
    
      
