import React from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
// import { Icon } from "antd";
import "../stylesheets/reservation.css";
import "../stylesheets/general.css";

function Reservation() {
  return (
    <div>
      <NavbarMainPage />
      <div className=" reservation-section">
        <div className="reservation-main-title-section">
          <hr className="horizontalRule2"></hr>
          <h1 id="title" className="reservation-main-title">
            Book Now
          </h1>
          <hr className="horizontalRule2"></hr>
        </div>
        <div className="when-and-where">
          <div className="when">
            <div className="when-and-where-header">
              <h4 className="when-and-where-main-title">When ?</h4>
              <h6 className="when-and-where-second-title">
                Choose the perfect time for you
              </h6>
              <form>
                <input
                  type="date"
                  id="date-input"
                  name="date"
                  value="2022-05-16"
                  // min="2018-11-20"
                  // max="2018-11-24"
                  placeholder="dd-mm-yyyy"
                  data-date=""
                  data-date-format="DD MMMM YYYY"
                />
              </form>
            </div>
            <div className="times">
              <li className="times-list">
                <ul className="time-element">
                  <div className="time-logo"></div>
                  <div>
                    <h6 className="time time">8h-9h</h6>
                  </div>
                </ul>
                <ul className="time-element">
                  <div className="time-logo"></div>
                  <div>
                    <h6 className="time">8h-9h</h6>
                  </div>
                </ul>
                <ul className="time-element">
                  <div className="time-logo"></div>
                  <div>
                    <h6 className="time">9h-10h</h6>
                  </div>
                </ul>
                <ul className="time-element">
                  <div className="time-logo">
                    <img
                      className="time-logo-img"
                      src="../../ball1.png"
                      alt="time-logo-img"
                    />
                  </div>
                  <div>
                    <h6 className="time time-selected">10h-11h</h6>
                  </div>
                </ul>
                <ul className="time-element">
                  <div className="time-logo"></div>
                  <div>
                    <h6 className="time">11h-12h</h6>
                  </div>
                </ul>
                <ul className="time-element">
                  <div className="time-logo"></div>
                  <div>
                    <h6 className="time">12h-13h</h6>
                  </div>
                </ul>
                <ul className="time-element">
                  <div className="time-logo"></div>
                  <div>
                    <h6 className="time">13h-14h</h6>
                  </div>
                </ul>
                <ul className="time-element">
                  <div className="time-logo"></div>
                  <div>
                    <h6 className="time">14h-15h</h6>
                  </div>
                </ul>
                <ul className="time-element">
                  <div className="time-logo"></div>
                  <div>
                    <h6 className="time time-out">15h-16h</h6>
                  </div>
                </ul>
                <ul className="time-element">
                  <div className="time-logo"></div>
                  <div>
                    <h6 className="time">16h-17h</h6>
                  </div>
                </ul>
                <ul className="time-element">
                  <div className="time-logo"></div>
                  <div>
                    <h6 className="time time-out">17h-18h</h6>
                  </div>
                </ul>
                <ul className="time-element">
                  <div className="time-logo"></div>
                  <div>
                    <h6 className="time time-out">18h-19h</h6>
                  </div>
                </ul>
              </li>
            </div>
          </div>
          <div className="where">
            <div className="when-and-where-header">
              <h4 className="when-and-where-main-title">When ?</h4>
              <h6 className="when-and-where-second-title">
                Choose the perfect time for you
              </h6>
              <form className="location-form">
                <input
                  type="text"
                  id="location-input"
                  name="date"
                  placeholder="Liège"
                />
                <label></label>
              </form>
            </div>
            <div className="map">
              <img className="map-img" src="../../map.jpg" alt="map" />
            </div>
          </div>
        </div>
        <div className="reservation-buttons">
          <button className="yellowButton">Reset</button>
          <button className="yellowButton">Next</button>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}

export default Reservation;
