import React, { useState, useEffect } from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/news.css";
import "../stylesheets/rankings.css";
import "../stylesheets/general.css";
import { Redirect } from "react-router-dom";

function News() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storage = localStorage.getItem("token");
    console.log(JSON.parse(storage));
    if (storage) setToken(JSON.parse(storage));
    else setToken(false);
  }, []);

  if (token === false) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div>
        <NavbarMainPage />
        <div className="news-section container center-stats">
          <div className="news">
            <div className="new">
              <div className="new-logo"></div>
              <h5 className="new-value ">Games & Results</h5>
            </div>
            <div className="new">
              <div className="new-logo">
                <img
                  className="new-logo-img"
                  src="../../ball1.png"
                  alt="time-logo-img"
                />
              </div>
              <h5 className="new-value new-value-active">ATP Rakings</h5>
            </div>
            <div className="new">
              <div className="new-logo"></div>
              <h5 className="new-value">WTA Rakings</h5>
            </div>
          </div>
        </div>
        <div className="rankings-section container">
          <div className="ranking">
            <div className="ranking-num">
              <p>1.</p>
            </div>
            <div className="ranking-player">
              <p>Novak Djokovic</p>
            </div>
            <div className="ranking-country">
              <p>Serbia</p>
            </div>
            <div className="ranking-points">
              <p>8660 pts</p>
            </div>
          </div>
          <div className="ranking">
            <div className="ranking-num">
              <p>1.</p>
            </div>
            <div className="ranking-player">
              <p>Novak Djokovic</p>
            </div>
            <div className="ranking-country">
              <p>Serbia</p>
            </div>
            <div className="ranking-points">
              <p>8660 pts</p>
            </div>
          </div>
          <div className="ranking">
            <div className="ranking-num">
              <p>1.</p>
            </div>
            <div className="ranking-player">
              <p>Novak Djokovic</p>
            </div>
            <div className="ranking-country">
              <p>Serbia</p>
            </div>
            <div className="ranking-points">
              <p>8660 pts</p>
            </div>
          </div>
          <div className="ranking">
            <div className="ranking-num">
              <p>1.</p>
            </div>
            <div className="ranking-player">
              <p>Novak Djokovic</p>
            </div>
            <div className="ranking-country">
              <p>Serbia</p>
            </div>
            <div className="ranking-points">
              <p>8660 pts</p>
            </div>
          </div>
          <div className="ranking">
            <div className="ranking-num">
              <p>1.</p>
            </div>
            <div className="ranking-player">
              <p>Novak Djokovic</p>
            </div>
            <div className="ranking-country">
              <p>Serbia</p>
            </div>
            <div className="ranking-points">
              <p>8660 pts</p>
            </div>
          </div>
          <div className="ranking">
            <div className="ranking-num">
              <p>1.</p>
            </div>
            <div className="ranking-player">
              <p>Novak Djokovic</p>
            </div>
            <div className="ranking-country">
              <p>Serbia</p>
            </div>
            <div className="ranking-points">
              <p>8660 pts</p>
            </div>
          </div>
          <div className="ranking">
            <div className="ranking-num">
              <p>1.</p>
            </div>
            <div className="ranking-player">
              <p>Novak Djokovic</p>
            </div>
            <div className="ranking-country">
              <p>Serbia</p>
            </div>
            <div className="ranking-points">
              <p>8660 pts</p>
            </div>
          </div>
          <div className="ranking">
            <div className="ranking-num">
              <p>1.</p>
            </div>
            <div className="ranking-player">
              <p>Novak Djokovic</p>
            </div>
            <div className="ranking-country">
              <p>Serbia</p>
            </div>
            <div className="ranking-points">
              <p>8660 pts</p>
            </div>
          </div>
          <div className="ranking">
            <div className="ranking-num">
              <p>1.</p>
            </div>
            <div className="ranking-player">
              <p>Novak Djokovic</p>
            </div>
            <div className="ranking-country">
              <p>Serbia</p>
            </div>
            <div className="ranking-points">
              <p>8660 pts</p>
            </div>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

export default News;
