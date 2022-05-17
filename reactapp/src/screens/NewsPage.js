import React from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/news.css";
import "../stylesheets/general.css";

function News() {
  return (
    <div>
      <NavbarMainPage />
      <div className="news-section container center-stats">
        <div className="news">
          <div className="new">
            <div className="new-logo">
              <img
                className="new-logo-img"
                src="../../ball1.png"
                alt="time-logo-img"
              />
            </div>
            <h5 className="new-value new-value-active">Games & Results</h5>
          </div>
          <div className="new">
            <div className="new-logo"></div>
            <h5 className="new-value">ATP Rakings</h5>
          </div>
          <div className="new">
            <div className="new-logo"></div>
            <h5 className="new-value">WTA Rakings</h5>
          </div>
        </div>
      </div>
      <div className="news-results-section container">
        <div className="results-list">
          <div className="result-card">
            <div className="tournement-infos">
              <div className="tournemant-title">
                <h6>Internazionali BNL d'Italia (Rome, Italia)</h6>
              </div>
              <div className="tournemant-date">
                <h6>14/05/2022</h6>
              </div>
            </div>
            <diV className="round-info">
              <h6>Semi-Final</h6>
            </diV>
            <div className="players">
              <div className="player-ranking winner">
                <p>1.</p>
              </div>
              <div className="player-name winner">
                <p>N. Djokovic (Serbia)</p>
              </div>
              <div className="player-score">
                <div className="score-num winner">6</div>
                <div className="score-num">6</div>
                <div className="score-num winner">6</div>
              </div>
              <div className="ranking">
                <p>4.</p>
              </div>
              <div className="player">
                <p>S. Tsitsipas (Grec)</p>
              </div>
              <div className="player-score">
                <div className="score-num">0</div>
                <div className="score-num winner">7</div>
                <div className="score-num">3</div>
              </div>
            </div>
          </div>
          <div className="result-card">
            <div className="tournement-infos">
              <div className="tournemant-title">
                <h6>Internazionali BNL d'Italia (Rome, Italia)</h6>
              </div>
              <div className="tournemant-date">
                <h6>14/05/2022</h6>
              </div>
            </div>
            <diV className="round-info">
              <h6>Semi-Final</h6>
            </diV>
            <div className="players">
              <div className="player-ranking winner">
                <p>1.</p>
              </div>
              <div className="player-name winner">
                <p>N. Djokovic (Serbia)</p>
              </div>
              <div className="player-score">
                <div className="score-num winner">6</div>
                <div className="score-num">6</div>
                <div className="score-num winner">6</div>
              </div>
              <div className="ranking">
                <p>4.</p>
              </div>
              <div className="player">
                <p>S. Tsitsipas (Grec)</p>
              </div>
              <div className="player-score">
                <div className="score-num">0</div>
                <div className="score-num winner">7</div>
                <div className="score-num">3</div>
              </div>
            </div>
          </div>
          <div className="result-card">
            <div className="tournement-infos">
              <div className="tournemant-title">
                <h6>Internazionali BNL d'Italia (Rome, Italia)</h6>
              </div>
              <div className="tournemant-date">
                <h6>14/05/2022</h6>
              </div>
            </div>
            <diV className="round-info">
              <h6>Semi-Final</h6>
            </diV>
            <div className="players">
              <div className="player-ranking winner">
                <p>1.</p>
              </div>
              <div className="player-name winner">
                <p>N. Djokovic (Serbia)</p>
              </div>
              <div className="player-score">
                <div className="score-num winner">6</div>
                <div className="score-num">6</div>
                <div className="score-num winner">6</div>
              </div>
              <div className="ranking">
                <p>4.</p>
              </div>
              <div className="player">
                <p>S. Tsitsipas (Grec)</p>
              </div>
              <div className="player-score">
                <div className="score-num">0</div>
                <div className="score-num winner">7</div>
                <div className="score-num">3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}

export default News;
