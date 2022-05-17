import React from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/overview.css";
import "../stylesheets/general.css";

function Overview() {
  return (
    <div>
      <NavbarMainPage />
      <div className=" overview-section">
        <div className="reservation-main-title-section">
          <hr className="horizontalRule2"></hr>
          <h1 id="title" className="reservation-main-title">
            Overview
          </h1>
          <hr className="horizontalRule2"></hr>
        </div>
        <div>
          <div className="game-card">
            <div>
              <h6 className="game-info">Monday 14/02/22</h6>
            </div>
            <div>
              <h6 className="game-info">8pm - 9pm</h6>
            </div>
            <div>
              <h6 className="game-info">RTC Liège</h6>
            </div>
            <div>
              <h6 className="game-info">20 €/h</h6>
            </div>
          </div>
        </div>

        <div className="reservation-buttons">
          <button className="yellowButton">Confirm & Pay</button>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}

export default Overview;
