import React, { useState, useEffect } from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/news.css";
import "../stylesheets/rankings.css";
import "../stylesheets/general.css";
import { Redirect } from "react-router-dom";

function News() {
  const [token, setToken] = useState("");
  const [games, setGames] = useState([]);
  const [atpRankings, setATPRankings] = useState([]);
  const [wtaRankings, setWTARankings] = useState([]);
  const [state, setState] = useState("games");
  const [inputDate, setInputDate] = useState("");

  function getDateInNiceFormat(date) {
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const day = ("0" + date.getDate()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  function getDateInInputFormat(date) {
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  function renderGameCards(games, state) {
    if (state) {
      const cards = games.map((game, i) => {
        return (
          <div className="result-card" key={i}>
            <div className="tournement-infos">
              <div className="tournemant-title">
                <h6>
                  {game.tournamentName} ({game.city}, {game.country})
                </h6>
              </div>
              <div className="tournemant-date">
                <h6>{getDateInNiceFormat(new Date(inputDate))}</h6>
              </div>
            </div>
            <diV className="round-info">
              <h6>{game.round}</h6>
            </diV>
            <div className="players">
              <div
                className={
                  game.first_player?.id === game?.result?.winner_id
                    ? "player-ranking winner"
                    : "player-ranking"
                }
              >
                <p>
                  {game.first_player.ranking
                    ? `${game.first_player.ranking}.`
                    : ""}
                </p>
              </div>
              <div
                className={
                  game.first_player?.id === game?.result?.winner_id
                    ? "player-name winner"
                    : "player-name"
                }
              >
                <p>
                  {game.first_player?.name
                    ? game.first_player?.name
                    : "Unkown Player"}{" "}
                  {game.first_player?.country
                    ? `(${game.first_player.country})`
                    : ""}
                </p>
              </div>
              <div className="player-score">
                <div
                  className={
                    game.result?.away_set1 > game.result?.home_set1
                      ? "score-num winner"
                      : "score-num"
                  }
                >
                  {game.result?.away_set1}
                </div>
                <div
                  className={
                    game.result?.away_set2 > game.result?.home_set2
                      ? "score-num winner"
                      : "score-num"
                  }
                >
                  {game.result?.away_set2}
                </div>
                <div
                  className={
                    game.result?.away_set3 > game.result?.home_set3
                      ? "score-num winner"
                      : "score-num"
                  }
                >
                  {game.result?.away_set3}
                </div>
                <div
                  className={
                    game.result?.away_set4 > game.result?.home_set4
                      ? "score-num winner"
                      : "score-num"
                  }
                >
                  {game.result?.away_set4}
                </div>
                <div
                  className={
                    game.result?.away_set5 > game.result?.home_set5
                      ? "score-num winner"
                      : "score-num"
                  }
                >
                  {game.result?.away_set5}
                </div>
              </div>
              <div
                className={
                  game.second_player?.id === game?.result?.winner_id
                    ? "player-ranking winner"
                    : "player-ranking"
                }
              >
                <p>
                  {game.second_player.ranking
                    ? `${game.second_player.ranking}.`
                    : ""}
                </p>
              </div>
              <div
                className={
                  game.second_player?.id === game?.result?.winner_id
                    ? "player-name winner"
                    : "player-name"
                }
              >
                <p>
                  {" "}
                  {game.second_player?.name
                    ? game.second_player?.name
                    : "Unkown Player"}{" "}
                  {game.second_player?.country
                    ? `(${game.second_player.country})`
                    : ""}
                </p>
              </div>
              <div className="player-score">
                <div
                  className={
                    game.result?.away_set1 < game.result?.home_set1
                      ? "score-num winner"
                      : "score-num"
                  }
                >
                  {game.result?.home_set1}
                </div>
                <div
                  className={
                    game.result?.away_set2 < game.result?.home_set2
                      ? "score-num winner"
                      : "score-num"
                  }
                >
                  {game.result?.home_set2}
                </div>
                <div
                  className={
                    game.result?.away_set3 < game.result?.home_set3
                      ? "score-num winner"
                      : "score-num"
                  }
                >
                  {game.result?.home_set3}
                </div>
                <div
                  className={
                    game.result?.away_set4 < game.result?.home_set4
                      ? "score-num winner"
                      : "score-num"
                  }
                >
                  {game.result?.home_set4}
                </div>
                <div
                  className={
                    game.result?.away_set5 < game.result?.home_set5
                      ? "score-num winner"
                      : "score-num"
                  }
                >
                  {game.result?.home_set5}
                </div>
              </div>
            </div>
          </div>
        );
      });
      return cards;
    } else return "";
  }

  function renderRankings(rankings, state) {
    if (state) {
      const list = rankings.map((ranking, i) => {
        return (
          <div className="ranking" key={i}>
            <div className="ranking-num">
              <p>{ranking.ranking}.</p>
            </div>
            <div className="ranking-player">
              <p>{ranking.name}</p>
            </div>
            <div className="ranking-country">
              <p>{ranking.country}</p>
            </div>
            <div className="ranking-points">
              <p>{ranking.points} pts</p>
            </div>
          </div>
        );
      });
      return list;
    } else return "";
  }

  async function getNews(date = "", rankings = "") {
    var rawResponse = await fetch(`/news?date=${date}&rankings=${rankings}`);
    var response = await rawResponse.json();
    console.log(response);

    if (date.length !== 0) {
      let gamesToRender = [];
      const tournaments = response.data.result.results;
      tournaments.forEach((tournament) => {
        const tournamentName = tournament.tournament?.name;
        const city = tournament.tournament?.city;
        const country = tournament.tournament?.country;
        tournament.matches.forEach((match) => {
          gamesToRender.push({
            tournamentName,
            city,
            country,
            first_player: {
              id: match?.away_id,
              name: match.away?.full_name,
              country: match.away?.country,
              ranking: match.away?.ranking,
            },
            second_player: {
              id: match?.home_id,
              name: match.home?.full_name,
              country: match.home?.country,
              ranking: match.home?.ranking,
            },
            result: match?.result,
            round: match?.round_name,
          });
        });
      });
      console.log(gamesToRender);
      setGames(gamesToRender);
    }

    if (rankings.length !== 0) {
      let rankingsToRender = [];
      let rankingsList = response.data.result.results.rankings;
      for (let i = 0; i < 100; i++) {
        rankingsToRender.push({
          name: rankingsList[i]?.full_name,
          country: rankingsList[i]?.country,
          ranking: rankingsList[i]?.ranking,
          points: rankingsList[i]?.ranking_points,
        });
      }

      console.log(rankingsToRender);
      if (rankings === "ATP") setATPRankings(rankingsToRender);
      if (rankings === "WTA") setWTARankings(rankingsToRender);
    }
  }

  function updateInputDate(inputDate) {
    setInputDate(inputDate);
    getNews(new Date(inputDate));
  }

  useEffect(() => {
    setInputDate(getDateInInputFormat(new Date(Date.now())));
    const storage = localStorage.getItem("token");
    console.log(JSON.parse(storage));
    if (storage) setToken(JSON.parse(storage));
    else setToken(false);
    getNews(new Date(Date.now()));
    getNews("", "ATP");
    getNews("", "WTA");
  }, []);

  if (token === false) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div>
        <NavbarMainPage />
        <div className="news-big-container">
          <div className="white-bg">
            <div className="news-section container center-stats margin-top-news">
              <div className="news">
                <div className="new" onClick={() => setState("games")}>
                  <div className="new-logo">
                    {state === "games" ? (
                      <img
                        className="new-logo-img"
                        src="../../ball1.png"
                        alt="time-logo-img"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <h5
                    className={
                      state === "games"
                        ? "new-value new-value-active"
                        : "new-value"
                    }
                  >
                    Games & Results
                  </h5>
                </div>
                <div className="new" onClick={() => setState("atp")}>
                  <div className="new-logo">
                    {state === "atp" ? (
                      <img
                        className="new-logo-img"
                        src="../../ball1.png"
                        alt="time-logo-img"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <h5
                    className={
                      state === "atp"
                        ? "new-value new-value-active"
                        : "new-value"
                    }
                  >
                    ATP Rakings
                  </h5>
                </div>
                <div className="new" onClick={() => setState("wta")}>
                  <div className="new-logo">
                    {state === "wta" ? (
                      <img
                        className="new-logo-img"
                        src="../../ball1.png"
                        alt="time-logo-img"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <h5
                    className={
                      state === "wta"
                        ? "new-value new-value-active"
                        : "new-value"
                    }
                  >
                    WTA Rakings
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="news-results-section container">
            <div className=" rankings-section ">
              <form
                className={
                  state === "games"
                    ? "when-input-style"
                    : "when-input-style remove"
                }
              >
                <input
                  type="date"
                  id="date-input"
                  name="date"
                  value={inputDate}
                  placeholder="dd-mm-yyyy"
                  data-date=""
                  onChange={(e) => updateInputDate(e.target.value)}
                  data-date-format="DD MMMM YYYY"
                />
              </form>
              {renderGameCards(games, state === "games" ? true : false)}
              {renderRankings(atpRankings, state === "atp" ? true : false)}
              {renderRankings(wtaRankings, state === "wta" ? true : false)}
            </div>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

export default News;
