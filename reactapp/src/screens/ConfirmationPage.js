import React, { useState, useEffect } from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/confirmation.css";
import "../stylesheets/general.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function Confirmation(props) {
  const [overview, setOverview] = useState("");
  const [goToAllGames, setGoToAllGames] = useState(false);
  const [weekDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const [token, setToken] = useState("");

  const getLocalStorage = function () {
    const storage = localStorage.getItem("currentReservation");
    console.log(JSON.parse(storage));
    if (storage) setOverview(JSON.parse(storage));

    // const storage2 = localStorage.getItem("myList");
    // if (storage2) setToken(JSON.parse(storage2));
  };

  async function saveReservation() {
    // if (!overview || overview !== "") {
    let currentReservation, token;

    const storage = localStorage.getItem("currentReservation");
    console.log(JSON.parse(storage));
    if (storage) currentReservation = JSON.parse(storage);

    const storage2 = localStorage.getItem("token");
    if (storage2) token = JSON.parse(storage2);

    var rawResponse = await fetch("/users/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenUser: token,
        tokenClub: currentReservation.club,
        day: weekDays[new Date(currentReservation.date).getDay()],
        date: currentReservation.date,
        time: currentReservation.time,
        price: currentReservation.price,
        clubname: currentReservation.clubname,
      }),
    });
    var response = await rawResponse.json();

    console.log("-----USER------");
    console.log(response);

    var rawResponse2 = await fetch("/clubs/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tokenUser: token,
        tokenClub: currentReservation.club,
        date: new Date(currentReservation.date),
        time: currentReservation.time,
      }),
    });
    var response2 = await rawResponse2.json();
    console.log("-----CLUB------");
    console.log(response2);
    props.cleanReservation();
    localStorage.removeItem("currentReservation");
    // }
  }

  useEffect(() => {
    const storage = localStorage.getItem("token");
    console.log(JSON.parse(storage));
    if (storage) setToken(JSON.parse(storage));
    else setToken(false);
    getLocalStorage();
    saveReservation();
  }, []);

  if (token === false) {
    return <Redirect to="/signin" />;
  } else if (goToAllGames) {
    return <Redirect to="/games" />;
  } else {
    return (
      <div>
        <NavbarMainPage />
        <div className=" confirmation-section margin-top">
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
                  <h6 className="game-info">
                    {" "}
                    {weekDays[new Date(overview.date)?.getDay()]}{" "}
                    {new Date(overview.date)?.getDate()}/
                    {new Date(overview.date)?.getMonth() + 1}/
                    {new Date(overview.date)?.getFullYear()}
                  </h6>
                </div>
                <div>
                  <h6 className="game-info">
                    {overview?.time}h -{" "}
                    {+overview?.time + 1 < 24 ? +overview?.time + 1 : "00"}h
                  </h6>
                </div>
                <div>
                  <h6 className="game-info">{overview?.clubname}</h6>
                </div>
                <div>
                  <h6 className="game-info">{overview?.price} €/h</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="confirmation-button-section">
            <button
              className="yellowButton"
              onClick={() => setGoToAllGames(true)}
            >
              See All Coming Games
            </button>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cleanReservation: function () {
      dispatch({ type: "cleanReservation" });
    },
  };
}

function mapStateToProps(state) {
  return { currentReservation: state.currentReservation, token: state.token };
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
