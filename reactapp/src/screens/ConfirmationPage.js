import React from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/confirmation.css";
import "../stylesheets/general.css";

function confirmation() {
  return (
    <div>
      <NavbarMainPage />
      <div className=" confirmation-section">
        <div className="reservation-main-title-section">
          <hr className="horizontalRule3"></hr>
          <h1 id="title" className="reservation-main-title">
            You made it!
          </h1>
          <hr className="horizontalRule3"></hr>
        </div>
        <div className="coming-game">
          <div>
            <h4 className="coming-game-title">Coming Game:</h4>
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
        </div>

        <div className="reservation-buttons">
          <button className="yellowButton">See All Coming Games</button>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}

export default confirmation;
