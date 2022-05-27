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
              <h1 id="title-club-page">TieBreak</h1>
            </div>
            <div className="header-description">
              <p>The must-have tennis management app</p>
            </div>
          </div>
          <div className="after-banner-space">
          </div>

          <div className="general-explanation">


            <div className="card-club-page-odd">  
              <p className="text-description">
                Our vision is to increase your business by using the internet power.
              </p> 
            </div>
            
            <div className="card-club-page-even"> 
              <p className="text-description">
                Spare time by using an automatic courts rental system.
              </p> 
            </div>
          
            <div className="card-club-page-odd"> 
              <p className="text-description">
                Be more visible thanks to TieBreak. 
              </p>
            </div>

            <div className="card-club-page-even"> 
              <p className="text-description">
                Being visible nowadays is more than an asset. It’s just a need! 
              </p>
            </div>

            <div className="card-club-page-odd"> 
              <p className="text-description">
                And here we are to help you in that way ! 
              </p> 
            </div>

          </div>

          <div className="after-banner-space"> </div>
          
          <div className="more-precisely-title">
            <h3 className="title-more-precisely"> More Precisely</h3> 
          </div>

          <div className="more-precisely-card"> 
          
            <div className="more-precisely-left">

              <h2 className="more-precisly-card-header"> Benefits on Your side </h2>

              <div> 

                <p className="more-precisely-number"> 1 </p>

                <p className="more-precisely-header"> Easy Calendar management</p>

                <p className="more-precisely-description">You can close/open slots as it suits your the best.</p>

              </div>

              <div> 

                <p className="more-precisely-number"> 2 </p>

                <p className="more-precisely-header"> Easy Paiement</p>

                <p className="more-precisely-description">Get one weekly paiement on your account for all the
                    bookings.</p>

              </div>

              <div> 

                <p className="more-precisely-number"> 3 </p>

                <p className="more-precisely-header"> Get some stats about your club</p>

                <p className="more-precisely-description">We’ll provide you with a fabulous dashboard. You’ll be able
                    to get more informtion about your club’s rental.</p>

              </div>





            </div>

            <div className="more-precisely-rigth">
              
              <h2 className="more-precisly-card-header"> Benefits on your customer’s side </h2>
            
              <div> 

                <p className="more-precisely-number"> 1 </p>

                <p className="more-precisely-header"> Easy Calendar management</p>

                <p className="more-precisely-description">Your customer’s can now easily rent a court. They go on the
                    website, select a timeframe and they can play!</p>

              </div>

              <div> 

                <p className="more-precisely-number"> 2 </p>

                <p className="more-precisely-header"> Easy Paiement</p>

                <p className="more-precisely-description">Customer’s can pay online. It’s much more customer’s
                    friendly.</p>

              </div>

              <div> 

                <p className="more-precisely-number"> 3 </p>

                <p className="more-precisely-header"> Get Your History</p>

                <p className="more-precisely-description">Every customer will be able to consult their bookings. This
                    include future reservation’s, but they can also consult the
                    past one’s.</p>

              </div>
            </div>
          
          
          
          </div>



         


    
        </div>
    
      
      <FooterPage />
    </div>

  );
}

export default ClubMain;
      
      
      
      
      
      
      