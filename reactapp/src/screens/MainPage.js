import React from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/games.css";
import "../stylesheets/general.css";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';

function Home(props) {

  if (props.token === '') {
    return <Redirect to='/signin' />
  } else {
  
  return (
    <div>
      <NavbarMainPage />
      <div className="games-section">
        <div className="start-reservation-btn-section">
          <button className="yellowButton start-reservation-big-btn">
            Start a Reservation
          </button>
        </div>
        <div className="stats-section container center-stats">
          <div className="stats">
            <div className="stat">
              <h5 className="stat-title">Total Games Played:</h5>
              <h5 className="stat-value">20</h5>
            </div>
            <div className="stat">
              <h5 className="stat-title">Favorite Club:</h5>
              <h5 className="stat-value">RTC Aywaille</h5>
            </div>
            <div className="stat">
              <h5 className="stat-title">Total Games Played This Month:</h5>
              <h5 className="stat-value">3</h5>
            </div>
            <div className="stat">
              <h5 className="stat-title">Favorite Club of The Month:</h5>
              <h5 className="stat-value">TC Bruxelles</h5>
            </div>
          </div>
        </div>
        <div className="games">
          <div className="container center-games">
            <div className="games-titles">
              <div>
                <h2 className="games-title active-games-title">Coming Games</h2>
              </div>
              <div>
                <div className="games-titles-background">
                  <div className="games-titles-tennisball coming">
                    <img
                      className="tennisball-img"
                      src="../../ball1.png"
                      alt="logo"
                    />
                  </div>
                </div>
              </div>
              <h2 className="games-title">Previous Games</h2>
            </div>
            <div className="games-list">
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
              <div className="game-card">
                <div>
                  <h6 className="game-info">Monday 21/02/22</h6>
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
              <div className="game-card">
                <div>
                  <h6 className="game-info">Wednesday 23/02/22</h6>
                </div>
                <div>
                  <h6 className="game-info">2pm - 3pm</h6>
                </div>
                <div>
                  <h6 className="game-info">RTC Aywaille</h6>
                </div>
                <div>
                  <h6 className="game-info">16 €/h</h6>
                </div>
              </div>
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
        </div>
      </div>
      <FooterPage />
    </div>
  );
}
}
function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(
  mapStateToProps
)(Home);
