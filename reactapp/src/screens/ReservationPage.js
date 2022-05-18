import React, { useState, useEffect } from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/reservation.css";
import "../stylesheets/general.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faLocationDot,
  faEnvelope,
  faPhone,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";

function Reservation() {
  function setMapLocation() {
    var lat = 50.84,
      lng = 4.36;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
        },
        function () {
          alert("Could not get your position");
          lat = 20;
          lng = 20;
        }
      );

      return { lat, lng };
    }
  }
  const [hours, setHours] = useState([
    8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  ]);
  const [date, setDate] = useState(new Date(Date.now()));
  const [inputDate, setInputDate] = useState("");
  const [time, setTime] = useState("");
  const [club, setClub] = useState("");
  const [allClubs, setAllClubs] = useState([]);
  const [sortAllClubs, setSortAllClubs] = useState([]);
  const [availableClubs, setAvailableClubs] = useState([]);
  const [availableHours, setAvailableHours] = useState([
    8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  ]);
  const [mapPosition, setMapPostition] = useState(setMapLocation());

  function generatePopups(clubs) {
    const popups = clubs.map((club, i) => {
      const customMarkerIcon = divIcon({
        html: ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
        <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
        <path fill="${
          availableClubs.find((el) => el === club.token) ? "#b3541e" : "#ddd"
        }" stroke="#333" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
      </svg>
      `,
        iconSize: [32, 32],
        className: "marker",
      });
      return (
        <Marker
          position={{ lat: club.latitude, lng: club.longitude }}
          icon={customMarkerIcon}
          key={i}
        >
          <Popup>
            <h1
              className="marker-title"
              style={{
                color: availableClubs.find((el) => el === club.token)
                  ? "#b3541e"
                  : "#aaa",
                fontSize: "1.6rem",
                fontWeight: 600,
              }}
            >
              {club.clubname}
            </h1>
            <div
              className="marker-div"
              style={{
                color: availableClubs.find((el) => el === club.token)
                  ? "#b3541e"
                  : "#aaa",
              }}
            >
              <div>
                <FontAwesomeIcon className="club-icon" icon={faLocationDot} />
                <p>{club?.address}</p>
              </div>
              <div>
                <FontAwesomeIcon className="club-icon" icon={faPhone} />
                <p>{club.phone}</p>
              </div>
              <div>
                <FontAwesomeIcon className="club-icon" icon={faEnvelope} />
                <p>{club.email}</p>
              </div>
              <div>
                <FontAwesomeIcon
                  className="club-icon"
                  icon={faHandHoldingDollar}
                />
                <p>{club.price} €/h</p>
              </div>
            </div>
            <button
              className={
                availableClubs.find((el) => el === club.token)
                  ? "yellowButton map-button"
                  : "yellowButton amp-button hidden"
              }
              onClick={() =>
                clickOnClub(
                  availableClubs.find((el) => el === club.token)
                    ? club.token
                    : null
                )
              }
            >
              Select
            </button>
          </Popup>
        </Marker>
      );
    });

    return popups;
  }

  function renderClubCards(clubs) {
    const cards = clubs.map((club, i) => {
      return (
        <div
          className={
            availableClubs.find((el) => el === club.token)
              ? "club-card"
              : "club-card club-card-not-available"
          }
          key={i}
        >
          <div className="club-title">
            <h4>{club.clubname}</h4>
          </div>
          <div className="club-infos">
            <div>
              <FontAwesomeIcon className="club-icon" icon={faLocationDot} />
              <p>{club?.address}</p>
            </div>
            <div>
              <FontAwesomeIcon className="club-icon" icon={faPhone} />
              <p>{club.phone}</p>
            </div>
            <div>
              <FontAwesomeIcon className="club-icon" icon={faEnvelope} />
              <p>{club.email}</p>
            </div>
            <div>
              <FontAwesomeIcon
                className="club-icon"
                icon={faHandHoldingDollar}
              />
              <p>{club.price} €/h</p>
            </div>
          </div>
          <div className="club-button-section">
            <button
              className={
                availableClubs.find((el) => el === club.token)
                  ? "yellowButton club-button"
                  : "yellowButton club-button hidden"
              }
              onClick={() =>
                clickOnClub(
                  availableClubs.find((el) => el === club.token)
                    ? club.token
                    : null
                )
              }
            >
              Select
            </button>
          </div>
        </div>
      );
    });
    return cards;
  }

  function renderHours(hours, availableHours, time) {
    const hoursList = hours.map((hour, i) => {
      return (
        <ul
          className="time-element"
          data-time={hour}
          data-valid={availableHours.find((el) => el === hour) ? true : false}
          key={i}
          onClick={(e) => clickOnTime(e)}
        >
          <div className="time-logo">
            {hour == time ? (
              <img
                className="time-logo-img"
                src="../../ball1.png"
                alt="time-logo-img"
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <h6
              className={
                availableHours.find((el) => el === hour)
                  ? hour == time
                    ? "time time-selected"
                    : "time "
                  : "time-out"
              }
            >
              {hour}h-{hour + 1 < 24 ? hour + 1 : "00"}h
            </h6>
          </div>
        </ul>
      );
    });
    return hoursList;
  }

  function handleReset() {
    setDate(new Date(Date.now()));
    console.log("hello");
    setInputDate(getDateInNiceFormat(new Date(Date.now())));
    setTime("");
    setClub("");
    setAvailableHours([
      8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    ]);
    schedule(new Date(Date.now()));
  }

  async function updateInputDate(inputDate) {
    setInputDate(inputDate);
    setDate(new Date(inputDate));

    await schedule(new Date(inputDate));
    // if (club.length === 0) await schedule(new Date(inputDate));
    if (club.length !== 0) await schedule(new Date(inputDate), club);
    setTime("");
    document.querySelector(".next-button").classList.add("not-clickable");
  }

  async function clickOnTime(e) {
    const timeElement = e.target.closest(".time-element");
    // console.log(timeElement);
    // console.log(timeElement.classList.contains("time-out"));
    console.log(timeElement.dataset.valid);
    // if (!timeElement || timeElement.classList.contains("time-out")) return;
    if (!timeElement || timeElement.dataset.valid === "false") return;
    setTime(timeElement.dataset.time);
    await schedule(date, "", timeElement.dataset.time);
    // if (club.length === 0) schedule(date, "", timeElement.dataset.time);
    if (club.length !== 0)
      document.querySelector(".next-button").classList.remove("not-clickable");
  }

  function clickOnClub(clubToken) {
    if (!clubToken) return;
    setClub(clubToken);

    if (time === "") schedule(date, clubToken);

    if (time !== "")
      document.querySelector(".next-button").classList.remove("not-clickable");
  }

  async function loadClubs() {
    var rawResponse = await fetch("/clubs/all");
    var response = await rawResponse.json();

    setAllClubs(response.data.clubs);
    sortClubs(mapPosition, response.data.clubs);
  }

  function sortClubs(position, listClubs) {
    const sortClubs = [...listClubs];
    sortClubs.sort(function (a, b) {
      const dx_a = a.latitude - position.lat;
      const dy_a = a.longitude - position.lng;
      const dist_a = Math.sqrt(dx_a * dx_a + dy_a * dy_a);
      const dx_b = b.latitude - position.lat;
      const dy_b = b.longitude - position.lng;
      const dist_b = Math.sqrt(dx_b * dx_b + dy_b * dy_b);
      return dist_a - dist_b;
    });
    setSortAllClubs(sortClubs);
  }

  async function schedule(date, club = "", time = "") {
    var rawResponse = await fetch(
      `/schedule?date=${date}&club=${club}&time=${time}`
    );
    var response = await rawResponse.json();
    // console.log(response);

    if (club.length === 0) setAvailableClubs(response.data.availabilities);
    else {
      const times = response.data.availabilities.map(
        (availability) => availability.time
      );
      setAvailableHours(times);
    }
  }

  function getDateInNiceFormat(date) {
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    // getLocation();

    setInputDate(getDateInNiceFormat(new Date(Date.now())));
    loadClubs();
    schedule(date);
  }, []);

  return (
    <div>
      <NavbarMainPage />
      <div className=" reservation-section">
        <div className="reservation-main-title-section">
          <hr className="horizontalRule2"></hr>
          <h1 id="title" className="reservation-main-title">
            Book Now
          </h1>
          <hr className="horizontalRule2"></hr>
        </div>
        <div className="when-and-where">
          <div className="when">
            <div className="when-and-where-header">
              <h4 className="when-and-where-main-title">When ?</h4>
              <h6 className="when-and-where-second-title">
                Choose the perfect time for you
              </h6>
              <form className="when-input-style">
                <input
                  type="date"
                  id="date-input"
                  name="date"
                  value={inputDate}
                  min={getDateInNiceFormat(new Date(Date.now()))}
                  placeholder="dd-mm-yyyy"
                  data-date=""
                  onChange={(e) => updateInputDate(e.target.value)}
                  data-date-format="DD MMMM YYYY"
                />
              </form>
            </div>
            <div className="times">
              <li className="times-list">
                {renderHours(hours, availableHours, time)}
              </li>
            </div>
          </div>
          <div className="where">
            <div className="when-and-where-header">
              <h4 className="when-and-where-main-title">Where ?</h4>
              <h6 className="when-and-where-second-title">
                Choose the perfect club for you
              </h6>
              <form className="location-form when-input-style">
                <input
                  type="text"
                  id="location-input"
                  name="date"
                  placeholder="Liège"
                />
                <label>
                  <FontAwesomeIcon className="search-icon" icon={faSearch} />
                </label>
              </form>
            </div>
            <div className="where-content">
              <MapContainer
                className="map-container"
                center={mapPosition}
                zoom={6}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ></TileLayer>
                {generatePopups(allClubs)}
              </MapContainer>
              <div className="clubs-cards">{renderClubCards(sortAllClubs)}</div>
            </div>
          </div>
        </div>
        <div className="your-reservation">
          <h5>Date: {inputDate}</h5>
          <h5>Time: {time}</h5>
          <h5>Club: {club}</h5>
        </div>
        <div className="reservation-buttons">
          <button className="yellowButton" onClick={() => handleReset()}>
            Reset
          </button>
          <button className="next-button yellowButton not-clickable">
            Next
          </button>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}

export default Reservation;
