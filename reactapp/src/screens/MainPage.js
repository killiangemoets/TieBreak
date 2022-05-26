import React, { useState, useEffect } from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/games.css";
import "../stylesheets/general.css";
import "../stylesheets/queries.css";
import "../stylesheets/navbar.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

function Home(props) {
  const [comingGames, setComingGames] = useState([]);
  const [previousGames, setPreviousGames] = useState([]);

  const [switchToggled, setSwitchToggled] = useState(false);
  const [totalGamesPlayed, setTotalGamesPlayed] = useState("");
  const [gamesPlayedThisMonth, setGamesPlayedThisMonth] = useState("");
  const [favoriteClub, setFavoriteClub] = useState("");
  const [clubOfThisMonth, setClubOfThisMonth] = useState("");
  const [token, setToken] = useState("");
  const [type, setType] = useState("");

  function hideNavBar() {
    const navbar = document.querySelector(".navbarRight");
    const menuIcon = document.querySelector(".mobile-nav-menu-icon");
    const crossIcon = document.querySelector(".mobile-nav-cross-icon");
    navbar.classList.remove("nav-open");
    menuIcon.classList.remove("remove");
    crossIcon.classList.add("remove");
  }

  const toggleSwitch = () => {
    switchToggled ? setSwitchToggled(false) : setSwitchToggled(true);
  };

  async function matchData(token) {
    // C'est un GET par défaut le fetch
    var rawResponse = await fetch(`users/games/${token}`);
    // var rawResponse = await fetch("users/games/wvkwrx");
    // On récupère le token grace à REDUX
    var response = await rawResponse.json();
    // console.log(response);

    const totalGames = response.data.games;

    let previousGames = [],
      comingGames = [];

    const dateNow = new Date(Date.now());
    const timeNow = dateNow.getHours();
    console.log(dateNow, timeNow);

    // totalGames.sort(function (a, b) {
    //   // console.log(new Date(a.date) + " and " + new Date(b.date));
    //   if (a.date === b.date) {
    //     // console.log("Dates are the same");
    //     return a.time - b.time;
    //   } else {
    //     // console.log("Dates are NOT the same");
    //     return new Date(a.date) - new Date(b.date);
    //   }
    // });

    totalGames.forEach((game) => {
      if (
        new Date(game.date) > dateNow ||
        (new Date(game.date).getFullYear() === dateNow.getFullYear() &&
          new Date(game.date).getMonth() === dateNow.getMonth() &&
          new Date(game.date).getDate() === dateNow.getDate() &&
          game.time >= timeNow)
      ) {
        comingGames.push(game);
      } else {
        previousGames.push(game);
      }
    });

    comingGames.sort(function (a, b) {
      if (a.date === b.date) {
        return a.time - b.time;
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });
    previousGames.sort(function (a, b) {
      if (a.date === b.date) {
        return b.time - a.time;
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });

    setComingGames(comingGames);
    setPreviousGames(previousGames);
    setTotalGamesPlayed(previousGames.length);

    const gamesPlayedThisMonth = previousGames.filter(
      (game) =>
        new Date(game.date).getMonth() === dateNow.getMonth() &&
        new Date(game.date).getFullYear() === dateNow.getFullYear()
    );
    setGamesPlayedThisMonth(gamesPlayedThisMonth.length);

    let clubs = [];
    totalGames.forEach((game) => {
      if (clubs.find((club) => club.name === game.club)) {
        clubs.forEach((club) => {
          if (club.name === game.club) club.count++;
        });
      } else clubs.push({ name: game.club, count: 1 });
    });
    clubs.sort(function (a, b) {
      return b.count - a.count;
    });
    // console.log(clubs);
    setFavoriteClub(clubs[0].name);

    let clubs2 = [];
    const totalGamesOfTheMonth = totalGames.filter((game) => {
      const gameDate = new Date(game.date);
      const currentDate = new Date(Date.now());
      return (
        gameDate.getMonth() === currentDate.getMonth() &&
        gameDate.getFullYear() === currentDate.getFullYear()
      );
    });
    totalGamesOfTheMonth.forEach((game) => {
      if (clubs2.find((club) => club.name === game.club)) {
        clubs2.forEach((club) => {
          if (club.name === game.club) club.count++;
        });
      } else clubs2.push({ name: game.club, count: 1 });
    });
    clubs2.sort(function (a, b) {
      return b.count - a.count;
    });
    // console.log(clubs2);
    setClubOfThisMonth(clubs2[0].name);

    // console.log("--- PREVIOUS GAMES ---");
    // console.log(previousGames);
    // console.log("--- COMING GAMES ---");
    // console.log(comingGames);
  }
  useEffect(() => {
    const storage1 = localStorage.getItem("type");
    if (JSON.parse(storage1) !== "player") setType(false);
    const storage = localStorage.getItem("token");
    console.log(JSON.parse(storage));
    if (storage) setToken(JSON.parse(storage));
    else setToken(false);
    matchData(JSON.parse(storage));
  }, []);

  function renderGames(gameList) {
    var info = gameList.map((game, i) => {
      var date = new Date(game.date);
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var year = date.getFullYear();
      var fullDate = `${day}/${month}/${year}`;

      return (
        <div className="game-card" key={i}>
          <div>
            <h6 className="game-info">
              {game.day} {fullDate}
            </h6>
          </div>
          <div>
            <h6 className="game-info">
              {game.time}h - {+game.time + 1 < 24 ? +game?.time + 1 : "00"}h
            </h6>
          </div>
          <div>
            <h6 className="game-info">{game.club}</h6>
          </div>
          <div>
            <h6 className="game-info">{game.price} €</h6>
          </div>
        </div>
      );
    });
    return info;
  }

  if (token === false || type === false) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div>
        <NavbarMainPage />
        <div
          className="container center-content-games"
          onClick={() => hideNavBar()}
        >
          <div className="games-section margin-top">
            <div className="games">
              <div className=" center-games">
                <div className="games-titles">
                  <div>
                    <h2
                      className={
                        switchToggled
                          ? "games-title"
                          : "games-title active-games-title"
                      }
                      onClick={() => setSwitchToggled(false)}
                    >
                      Coming Games
                    </h2>
                  </div>
                  <div>
                    <div
                      className="games-titles-background"
                      onClick={toggleSwitch}
                    >
                      <div
                        className={
                          switchToggled
                            ? "games-titles-tennisball previous"
                            : "games-titles-tennisball coming"
                        }
                      >
                        <img
                          className="tennisball-img"
                          src="../../ball1.png"
                          alt="logo"
                        />
                      </div>
                    </div>
                  </div>
                  <h2
                    className={
                      switchToggled
                        ? "games-title active-games-title"
                        : "games-title"
                    }
                    onClick={() => setSwitchToggled(true)}
                  >
                    Previous Games
                  </h2>
                </div>
                <div className="games-list">
                  {/* {info}    */}
                  {/* {renderGames(gameList)} */}
                  {switchToggled
                    ? renderGames(previousGames)
                    : renderGames(comingGames)}
                </div>
              </div>
            </div>
            <div className="second-column">
              <div className="fix-column">
                <div className="start-reservation-btn-section">
                  <Link to="/reservation">
                    <button className="yellowButton start-reservation-big-btn">
                      Start a Reservation
                    </button>
                  </Link>
                </div>
                <div className="stats-section center-stats">
                  <div className="stats">
                    <div className="stat">
                      <h5 className="stat-title">Total Games Played:</h5>
                      <h5 className="stat-value">{totalGamesPlayed}</h5>
                    </div>
                    <div className="stat">
                      <h5 className="stat-title">Favorite Club:</h5>
                      <h5 className="stat-value">{favoriteClub}</h5>
                    </div>
                    <div className="stat">
                      <h5 className="stat-title">
                        Total Games Played This Month:
                      </h5>
                      <h5 className="stat-value">{gamesPlayedThisMonth}</h5>
                    </div>
                    <div className="stat">
                      <h5 className="stat-title">
                        Favorite Club of The Month:
                      </h5>
                      <h5 className="stat-value">{clubOfThisMonth}</h5>
                    </div>
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

export default Home;
