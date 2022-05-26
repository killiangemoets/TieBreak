import React, { useState, useEffect } from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/general.css";
import "../stylesheets/calendar.css";
import { Link, Redirect } from "react-router-dom";
import FooterPage from "../components/Footer";
import NavbarClub from "../components/NavbarClub";

function Calendar() {
  const [token, setToken] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [inputDate, setInputDate] = useState(new Date(Date.now()));
  const [availabilities, setAvailabilities] = useState([]);
  const [reservations, setReservations] = useState([]);

  function hideNavBar() {
    const navbar = document.querySelector(".navbarRight");
    const menuIcon = document.querySelector(".mobile-nav-menu-icon");
    const crossIcon = document.querySelector(".mobile-nav-cross-icon");
    navbar.classList.remove("nav-open");
    menuIcon.classList.remove("remove");
    crossIcon.classList.add("remove");
  }

  function getDateInNiceFormat(date) {
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  function updateInputDate(inputDate) {
    setInputDate(inputDate);
    setDate(new Date(inputDate));
  }

  async function getClubInfos(token) {
    var rawResponse = await fetch(`../clubs/infos/${token}`);
    var response = await rawResponse.json();
    console.log(response);
    setReservations(response.data.infos.reservations);
    setAvailabilities(response.data.infos.availabilities);
  }

  function renderInfos(availabilities, reservations, date) {
    const hours = [
      8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    ];
    const infos = hours.map((time, i) => {
      const availability = availabilities.find((el) => {
        return (
          new Date(el.date).getFullYear() === date.getFullYear() &&
          new Date(el.date).getMonth() === date.getMonth() &&
          new Date(el.date).getDate() === date.getDate() &&
          +el.time === time
        );
      });
      const num_availabilities = availability ? availability.courts : 0;
      const list_reservations = reservations.filter((el) => {
        return (
          new Date(el.date).getFullYear() === date.getFullYear() &&
          new Date(el.date).getMonth() === date.getMonth() &&
          new Date(el.date).getDate() === date.getDate() &&
          +el.time === time
        );
      });
      const num_reservations = list_reservations.length;
      return (
        <>
          <div>
            <h6>
              {time}h - {time + 1 < 24 ? time + 1 : "00"}h
            </h6>
          </div>
          <div>
            <h6>
              {num_reservations}/{num_availabilities + num_reservations}
            </h6>
          </div>
          <div className="details-list">
            {list_reservations.map((reservation) => {
              return (
                <h6>
                  {reservation.firstname} {reservation.lastname} -{" "}
                  {reservation.email} - {reservation.phone}
                </h6>
              );
            })}
          </div>
        </>
      );
    });
    return infos;
  }

  useEffect(() => {
    const storage1 = localStorage.getItem("type");
    if (JSON.parse(storage1) !== "club") setType(false);

    const storage = localStorage.getItem("token");
    if (storage) {
      setToken(JSON.parse(storage));
      getClubInfos(JSON.parse(storage));
    } else setToken(false);
    setInputDate(getDateInNiceFormat(new Date(Date.now())));
  }, []);

  if (token === false || type === false) {
    return <Redirect to="/club/signin" />;
  } else {
    return (
      <div>
        <NavbarClub />
        <div
          className="container center-sign margin-top calendar-section"
          onClick={() => hideNavBar()}
        >
          <div className="center-title calendar-title">
            <div className="sign-up-title calendar-consultation-title">
              <p>Consultation Mode</p>
            </div>
          </div>
          <div className="calendar-input">
            <form className="when-input-style calendar-input">
              <input
                type="date"
                id="date-input"
                name="date"
                value={inputDate}
                // min={getDateInNiceFormat(new Date(Date.now()))}
                placeholder="dd-mm-yyyy"
                data-date=""
                onChange={(e) => updateInputDate(e.target.value)}
                data-date-format="DD MMMM YYYY"
              />
            </form>
          </div>
          <div className="calendar-details">
            <div className="calendar-grid">
              <div>
                <h6 className="title">Time</h6>
              </div>
              <div>
                <h6 className="title">
                  {" "}
                  Reservations/<br></br>availabilities
                </h6>
              </div>
              <div>
                <h6 className="title">Reservations details</h6>
              </div>
              {renderInfos(availabilities, reservations, date)}
            </div>
          </div>
          <div className="  edit-btn-section">
            <Link to="/club/calendar/edit">
              <button className="yellowButton sign-in-sumbit-button edit-btn">
                {" "}
                Edit
              </button>
            </Link>
          </div>
        </div>

        <FooterPage />
      </div>
    );
  }
}

export default Calendar;
