import React, { useState, useEffect } from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/queries.css";
import "../stylesheets/general.css";
import { Redirect, Link } from "react-router-dom";
import FooterPage from "../components/Footer";
import NavbarClub from "../components/NavbarClub";
import { now } from "mongoose";

import { Calendar } from "antd";

import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";

function EditCalendar() {
  const [hours] = useState([
    8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  ]);

  const [token, setToken] = useState("");
  const [type, setType] = useState("");

  const [date, setDate] = useState(new Date(Date.now()));
  const [inputDate, setInputDate] = useState(new Date(Date.now()));

  const [availabilities, setAvailabilities] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [changes, setChanges] = useState([]);
  const [goback, setGoback] = useState(false);

  const [values, setValues] = useState(new Array(hours.length).fill(""));
  const [generalValue, setGeneralValue] = useState("");

  function hideNavbar() {
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

  // function updateInputDate(inputDate) {
  //   setInputDate(inputDate);
  //   setDate(new Date(inputDate));
  // }

  async function getClubInfos(token) {
    var rawResponse = await fetch(`../../clubs/infos/${token}`);
    var response = await rawResponse.json();
    setReservations(response.data.infos.reservations);
    setAvailabilities(response.data.infos.availabilities);

    calculateValues(
      response.data.infos.availabilities,
      response.data.infos.reservations,
      new Date(Date.now())
    );
  }

  function calculateValues(availabilities, reservations, date) {
    const obtainedValues = hours.map((time) => {
      const availability = availabilities.find((el) => {
        return (
          new Date(el.date).getFullYear() === date.getFullYear() &&
          new Date(el.date).getMonth() === date.getMonth() &&
          new Date(el.date).getDate() === date.getDate() &&
          +el.time === time
        );
      });
      const num_availabilities = availability ? +availability.courts : 0;
      const list_reservations = reservations.filter((el) => {
        return (
          new Date(el.date).getFullYear() === date.getFullYear() &&
          new Date(el.date).getMonth() === date.getMonth() &&
          new Date(el.date).getDate() === date.getDate() &&
          +el.time === +time
        );
      });
      const num_reservations = +list_reservations.length;

      if (
        changes.find(
          (change) =>
            new Date(change.date).getFullYear() ===
              new Date(date).getFullYear() &&
            new Date(change.date).getMonth() === new Date(date).getMonth() &&
            new Date(change.date).getDate() === new Date(date).getDate() &&
            +change.time === +time
        )
      ) {
        console.log("change detected");
        return (
          +changes.find(
            (change) =>
              new Date(change.date).getFullYear() ===
                new Date(date).getFullYear() &&
              new Date(change.date).getMonth() === new Date(date).getMonth() &&
              new Date(change.date).getDate() === new Date(date).getDate() &&
              +change.time === +time
          ).courts + num_reservations
        );
      } else {
        return num_availabilities + num_reservations;
      }
    });

    console.log(obtainedValues);

    setValues(obtainedValues);
  }

  function fixAGeneralValue(reservations, date, generalValue) {
    const today = new Date(Date.now());
    let limitTime = 0;
    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      console.log("TODAY");
      limitTime = today.getHours();
    }
    console.log("Limit Time: " + limitTime);

    const obtainedValues = hours.map((time) => {
      const list_reservations = reservations.filter((el) => {
        return (
          new Date(el.date).getFullYear() === date.getFullYear() &&
          new Date(el.date).getMonth() === date.getMonth() &&
          new Date(el.date).getDate() === date.getDate() &&
          +el.time === +time
        );
      });
      const num_reservations = list_reservations.length;

      if (time <= limitTime) {
        const availability = availabilities.find((el) => {
          return (
            new Date(el.date).getFullYear() === date.getFullYear() &&
            new Date(el.date).getMonth() === date.getMonth() &&
            new Date(el.date).getDate() === date.getDate() &&
            +el.time === time
          );
        });
        const num_availabilities = availability ? +availability.courts : 0;
        return num_availabilities;
      } else if (generalValue < num_reservations) {
        saveChange(0, time, date);
        return num_reservations;
      } else {
        saveChange(generalValue - num_reservations, time, date);
        return generalValue;
      }
    });

    console.log(obtainedValues);
    setValues(obtainedValues);
  }

  function saveChange(courts, time, date) {
    if (
      changes.find(
        (change) =>
          new Date(change.date).getFullYear() ===
            new Date(date).getFullYear() &&
          new Date(change.date).getMonth() === new Date(date).getMonth() &&
          new Date(change.date).getDate() === new Date(date).getDate() &&
          +change.time === +time
      )
    ) {
      let changesCopy = [...changes];
      changesCopy.forEach((change) => {
        if (
          new Date(change.date).getFullYear() ===
            new Date(date).getFullYear() &&
          new Date(change.date).getMonth() === new Date(date).getMonth() &&
          new Date(change.date).getDate() === new Date(date).getDate() &&
          +change.time === +time
        ) {
          change.courts = courts;
        }
      });
      setChanges(changesCopy);
      console.log(changesCopy);
    } else {
      setChanges((prevChanges) => [
        ...prevChanges,
        {
          courts,
          date,
          time,
        },
      ]);
    }
  }

  function renderInfos(reservations, date, values) {
    const today = new Date(Date.now());
    let limitTime = 0;
    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      console.log("TODAY");
      limitTime = today.getHours();
    }
    console.log("Limit Time: " + limitTime);

    const infos = hours.map((time, i) => {
      const list_reservations = reservations.filter((el) => {
        return (
          new Date(el.date).getFullYear() === date.getFullYear() &&
          new Date(el.date).getMonth() === date.getMonth() &&
          new Date(el.date).getDate() === date.getDate() &&
          +el.time === time
        );
      });
      const num_reservations = list_reservations.length;

      const availability = availabilities.find((el) => {
        return (
          new Date(el.date).getFullYear() === date.getFullYear() &&
          new Date(el.date).getMonth() === date.getMonth() &&
          new Date(el.date).getDate() === date.getDate() &&
          +el.time === time
        );
      });
      const num_availabilities = availability ? +availability.courts : 0;

      return (
        <>
          <div>
            <h6>
              {time}h - {time + 1 < 24 ? time + 1 : "00"}h
            </h6>
          </div>
          <div className="form-div">
            <form className="when-input-style edit-form">
              <input
                type="number"
                id="num-input"
                name="number"
                min={
                  time > limitTime
                    ? num_reservations
                    : num_reservations + num_availabilities
                }
                max={
                  time > limitTime ? 999 : num_reservations + num_availabilities
                }
                // placeholder={num_availabilities + num_reservations}
                value={values[i]}
                onChange={(e) => {
                  e.preventDefault();
                  if (
                    time <= limitTime &&
                    e.target.value < num_availabilities + num_reservations
                  )
                    e.target.value = num_availabilities + num_reservations;
                  else if (e.target.value < num_reservations)
                    e.target.value = num_reservations;

                  setValues((prevValues) => {
                    let copy = [...prevValues];
                    copy.splice(i, 1, e.target.value);
                    return copy;
                  });

                  saveChange(e.target.value - num_reservations, time, date);
                }}
              />
            </form>
          </div>
          <div>
            <h6>courts</h6>
          </div>
          <div>
            <h6 className="num-reservations">
              currently <span>{num_reservations}</span> reservation(s)
            </h6>
          </div>
        </>
      );
    });
    return infos;
  }

  async function handleConfirm() {
    var rawResponse = await fetch(`../../clubs/infos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, changes }),
    });
    var response = await rawResponse.json();
    console.log(response);
    setGoback(true);
  }

  useEffect(() => {
    setChanges([]);
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
  } else if (goback === true) {
    return <Redirect to="/club/calendar" />;
  } else {
    return (
      <div>
        <NavbarClub />
        <div
          className="center-sign margin-top calendar-section"
          onClick={() => hideNavbar()}
        >
          <div className="center-title calendar-title">
            <div className="calendar-consultation-title">
              <p>Edit Mode</p>
            </div>
          </div>
          {/* <div className="calendar-input">
            <form className="when-input-style">
              <input
                type="date"
                id="date-input"
                name="date"
                value={inputDate}
                min={getDateInNiceFormat(new Date(Date.now()))}
                placeholder="dd-mm-yyyy"
                data-date=""
                onChange={(e) => {
                  calculateValues(
                    availabilities,
                    reservations,
                    new Date(e.target.value)
                  );
                  setGeneralValue("");
                  updateInputDate(e.target.value);
                }}
                data-date-format="DD MMMM YYYY"
              />
            </form>
          </div> */}
          <div className="calendar-details">
            <div className=" calendar">
              {/* <p>
                Selected date:{" "}
                {date ? format(date, "dd MMM yyyy", { locale: enGB }) : "none"}.
              </p> */}
              <div className="calendar-element-section">
                <DatePickerCalendar
                  className="calendar-element"
                  date={date}
                  onDateChange={(date) => {
                    calculateValues(
                      availabilities,
                      reservations,
                      new Date(date)
                    );
                    setGeneralValue("");
                    setDate(date);
                  }}
                  locale={enGB}
                  modifiers={{
                    disabled: (date) =>
                      date.getDate() < new Date(Date.now()).getDate() &&
                      date.getMonth() <= new Date(Date.now()).getMonth() &&
                      date.getFullYear() <= new Date(Date.now()),
                  }}
                />
              </div>

              <div className="calendar-message">
                <h1>Edit Calendar</h1>
                <h6>Close and open slots as it suits you the best</h6>
                <p>
                  Use the last input to change the availabilities for all the
                  time slots
                </p>
              </div>
              {/* 
              <img
                src="../../tennis_edit.jpg"
                alt="calendar"
                className="edit-img"
              ></img> */}
              {/* <Calendar
                className="calendar-element"
                fullscreen={false}
                // onPanelChange={onPanelChange}
              /> */}
            </div>
            <div className="calendar-edit">
              <h4>Enter the number of courts available</h4>
              <div className="calendar-grid2">
                {" "}
                {renderInfos(reservations, date, values)}
                {/* <div className="same-number"> */}
                <div className="same-number">
                  <h6>Change all slots:</h6>
                </div>
                <div className="form-div same-number">
                  <form className="when-input-style">
                    <input
                      type="number"
                      id="num-input"
                      name="number"
                      // min={num_reservations}
                      placeholder={0}
                      min={0}
                      value={generalValue}
                      onChange={(e) => {
                        e.preventDefault();
                        setGeneralValue(e.target.value);
                        fixAGeneralValue(reservations, date, e.target.value);
                      }}
                    />
                  </form>
                </div>
                <div className="same-number">
                  <h6>courts</h6>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
          <div className="edit-btn-section">
            <button
              className="edit-btn2 yellowButton sign-in-sumbit-button "
              onClick={() => setGoback(true)}
            >
              {" "}
              Cancel
            </button>
            <button
              className="edit-btn2 yellowButton sign-in-sumbit-button "
              onClick={() => handleConfirm()}
            >
              {" "}
              Confirm
            </button>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

export default EditCalendar;
