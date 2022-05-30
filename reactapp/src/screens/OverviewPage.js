import React, { useState, useEffect } from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/overview.css";
import "../stylesheets/general.css";
import { Redirect } from "react-router-dom";

function Overview() {
  const [weekDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const [overview, setOverview] = useState("");
  const [returnBtn, setReturnBtn] = useState(false);
  const [token, setToken] = useState("");
  const [type, setType] = useState("");

  function hideNavbar() {
    const navbar = document.querySelector(".navbarRight");
    const menuIcon = document.querySelector(".mobile-nav-menu-icon");
    const crossIcon = document.querySelector(".mobile-nav-cross-icon");
    navbar.classList.remove("nav-open");
    menuIcon.classList.remove("remove");
    crossIcon.classList.add("remove");
  }

  const getLocalStorage = function () {
    const storage = localStorage.getItem("currentReservation");
    console.log(JSON.parse(storage));
    if (storage) setOverview(JSON.parse(storage));
  };

  async function handlePayment() {
    const rawResponse = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `${overview.clubname} - 
        ${("0" + new Date(overview.date).getDate()).slice(-2)}/${(
          "0" +
          (new Date(overview.date).getMonth() + 1)
        ).slice(-2)}/${new Date(overview.date).getFullYear()}`,
        price: overview.price,
      }),
    });
    const response = await rawResponse.json();
    console.log(response);
    window.location.href = response.url;
  }

  useEffect(() => {
    const storage1 = localStorage.getItem("type");
    if (JSON.parse(storage1) !== "player") setType(false);
    const storage = localStorage.getItem("token");
    if (storage) setToken(JSON.parse(storage));
    else setToken(false);
    getLocalStorage();
  }, []);

  if (token === false || type === false) {
    return <Redirect to="/signin" />;
  } else if (returnBtn) {
    return <Redirect to="/reservation" />;
  } else {
    return (
      <div>
        <NavbarMainPage />
        <div className=" overview-section" onClick={() => hideNavbar()}>
          <div className="reservation-main-title-section you-made-it">
            <h1 className="overview-main-title">Overview</h1>
          </div>
          <div>
            <div className="game-card">
              <div className="game-card-img-content">
                {overview?.image && overview?.image.length > 0 ? (
                  <img
                    src={overview.image}
                    alt="club"
                    className="game-img"
                  ></img>
                ) : (
                  <h3>No image</h3>
                )}
              </div>
              <div className="game-card-text-content">
                <div>
                  <h6 className="game-info">
                    {weekDays[new Date(overview.date)?.getDay()]}-
                    {("0" + new Date(overview.date)?.getDate()).slice(-2)}/
                    {("0" + (new Date(overview.date)?.getMonth() + 1)).slice(
                      -2
                    )}
                    /{new Date(overview.date)?.getFullYear()}
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

          <div className="reservation-buttons">
            <button
              className="yellowButton overview-btn"
              onClick={() => setReturnBtn(true)}
            >
              Return
            </button>
            {/* <form onSubmit={handlePayment}> */}
            {/* <PaymentElement /> */}
            <button
              onClick={() => handlePayment()}
              className="yellowButton overview-btn"
            >
              Confirm & Pay
            </button>
            {/* </form> */}
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

export default Overview;
