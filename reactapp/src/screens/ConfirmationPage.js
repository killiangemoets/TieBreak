import React, { useState, useEffect } from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/confirmation.css";
import "../stylesheets/general.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

function Confirmation(props) {
  const [overview] = useState(props.currentReservation);

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

  // await fetch("/create-checkout-session", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },

  //   body: JSON.stringify(reservation),
  // });

  async function saveReservation() {
    console.log(props.currentReservation);
    if (props?.currentReservation || props.currentReservation !== "") {
      var rawResponse = await fetch("/users/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenUser: "wvkwrx",
          tokenClub: props.currentReservation.club,
          day: weekDays[props.currentReservation.date.getDay()],
          date: props.currentReservation.date,
          time: props.currentReservation.time,
          price: props.currentReservation.price,
          clubname: props.currentReservation.clubname,
        }),
      });
      var response = await rawResponse.json();

      console.log("-----USER------");
      console.log(response);

      // var rawResponse2 = await fetch("/clubs/reservations", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     tokenUser: props.token,
      //     tokenClub: props.currentReservation.club,
      //     date: props.currentReservation.date,
      //     time: props.currentReservation.time,
      //   }),
      // });
      // var response2 = await rawResponse2.json();
      // console.log("-----CLUB------");
      // console.log(response2);
      // props.cleanReservation();
    }
  }
  useEffect(() => {
    saveReservation();
    props.cleanReservation();
  }, []);

  if (goToAllGames) {
    return <Redirect to="/games" />;
  } else {
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
                  <h6 className="game-info">
                    {" "}
                    {weekDays[props.currentReservation.date.getDay()]}{" "}
                    {props.currentReservation.date.getDate()}/
                    {props.currentReservation.date.getMonth() + 1}/
                    {props.currentReservation.date.getFullYear()}
                  </h6>
                </div>
                <div>
                  <h6 className="game-info">
                    {props.currentReservation.time}h -{" "}
                    {+props.currentReservation.time + 1 < 24
                      ? +props.currentReservation.time + 1
                      : "00"}
                    h
                  </h6>
                </div>
                <div>
                  <h6 className="game-info">
                    {props.currentReservation.clubname}
                  </h6>
                </div>
                <div>
                  <h6 className="game-info">
                    {props.currentReservation.price} €/h
                  </h6>
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
