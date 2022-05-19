import React, { useState } from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/overview.css";
import "../stylesheets/general.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// import { loadStripe } from "@stripe/stripe-js";

// let stripePromise;

// const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(
//       "pk_test_51KjexnJNQutKRIOsNHYfubdDtJjRblAZR8hXpPXAJRS6uu1LnRv0Xs9G3tBrOAVsap1ht8UlLQkrJ0hvl5CLROs6001t12xbfR"
//     );
//     return stripePromise;
//   }
// };
// const YOUR_DOMAIN = "http://localhost:3001";

function Overview(props) {
  const [weekDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const [returnBtn, setReturnBtn] = useState(false);
  const [nextBtn, setNextBtn] = useState(false);

  async function handlePayement() {
    const reservation = {
      title: "TC Bruxelles",
      price: 20,
    };

    await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },

      // body: JSON.stringify(reservation),
      body: "title=Bruxelles",
    });

    // setNextBtn(true);
  }

  if (returnBtn) {
    return <Redirect to="/reservation" />;
  } else if (nextBtn) {
    return <Redirect to="/reservation/confirmation" />;
  } else {
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
                <h6 className="game-info">
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

          <div className="reservation-buttons">
            <button
              className="yellowButton overview-btn"
              onClick={() => setReturnBtn(true)}
            >
              Return
            </button>
            <button
              className="yellowButton overview-btn"
              onClick={() => handlePayement()}
            >
              Confirm & Pay
            </button>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentReservation: state.currentReservation };
}

export default connect(mapStateToProps, null)(Overview);
