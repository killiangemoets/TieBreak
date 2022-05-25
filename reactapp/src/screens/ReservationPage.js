import React, { useState, useEffect } from "react";
import NavbarMainPage from "../components/NavbarMainPage";
import FooterPage from "../components/Footer";
import "../stylesheets/reservation.css";
import "../stylesheets/queries.css";
import "../stylesheets/general.css";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faLocationDot,
  faEnvelope,
  faPhone,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { divIcon } from "leaflet";

function Reservation(props) {
  const [hours] = useState([
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
  const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 });
  const [currentPosition, setCurrentPosition] = useState({ lat: 32, lng: 38 });
  const [searchLocation, setSearchLocation] = useState("");
  const [clubsResults, setClubsResults] = useState([]);
  const [next, setNext] = useState(false);
  const [token, setToken] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

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

  function MinimapBounds({ coords, loading }) {
    const map = useMap();
    if (loading) {
      map.setView([coords.lat, coords.lng], 6);
    } else map.flyTo([coords.lat, coords.lng], 10, { duration: 1 });
  }

  function moveToClub(coords) {
    setLoading(false);
    setMapPosition(coords);
  }

  function renderCurrentPosition(position) {
    const customMarkerIcon = divIcon({
      html: `

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
        <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
        <path fill="#74c0fc" stroke="#333" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
      </svg>

      `,
      iconSize: [32, 32],
      className: "marker",
    });
    return (
      <Marker
        position={{ lat: position.lat, lng: position.lng }}
        icon={customMarkerIcon}
      >
        <Popup>
          <h1
            className="marker-title"
            style={{
              color: "#74c0fc",
              fontSize: "1.2rem",
              fontWeight: 500,
            }}
          >
            You are here
          </h1>
        </Popup>
      </Marker>
    );
  }

  function renderClubCards(clubs, availableClubs, selectedClub) {
    const cards = clubs.map((club, i) => {
      return (
        <div
          className={
            availableClubs.find((el) => el === club.token)
              ? club.token === selectedClub
                ? "club-card club-card-selected"
                : "club-card"
              : "club-card club-card-not-available"
          }
          key={i}
          onClick={() =>
            moveToClub({ lat: club?.latitude, lng: club?.longitude })
          }
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

  function renderSearchResults(clubs, availableClubs, selectedClub) {
    const cards = clubs.map((club, i) => {
      return (
        <div
          className={
            availableClubs.find((el) => el === club.token)
              ? club.token === selectedClub
                ? "club-card club-card-selected club-result"
                : "club-card club-result"
              : "club-card club-card-not-available club-result"
          }
          key={i}
          onClick={() => {
            clickOnClub(
              availableClubs.find((el) => el === club.token) ? club.token : null
            );
            if (availableClubs.find((el) => el === club.token)) {
              setSearchLocation("");
              document.querySelector(".search-results").classList.add("hidden");
            }
          }}
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
          onClick={() =>
            clickOnTime(
              hour,
              availableHours.find((el) => el === hour) ? true : false
            )
          }
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
    setInputDate(getDateInNiceFormat(new Date(Date.now())));
    setTime("");
    setClub("");

    const timeNow = new Date(Date.now()).getHours();
    const updateAvailableHours = [...hours].filter((hour) => hour > timeNow);
    setAvailableHours(updateAvailableHours);

    schedule(new Date(Date.now()));
    document.querySelector(".next-button").classList.add("not-clickable");
  }

  function handleNext(e) {
    if (!e.target.classList.contains("not-clickable")) {
      // props.addReservation({
      //   date,
      //   time,
      //   club,
      //   clubname: allClubs.find((c) => c.token === club)?.clubname,
      //   price: allClubs.find((c) => c.token === club)?.price,
      // });
      localStorage.setItem(
        "currentReservation",
        JSON.stringify({
          date,
          time,
          club,
          clubname: allClubs.find((c) => c.token === club)?.clubname,
          price: allClubs.find((c) => c.token === club)?.price,
        })
      );

      setNext(true);
    }
  }

  function handlerSearchLocation(e) {
    setSearchLocation(e.target.value);
    if (e.target.value.length > 0) {
      document.querySelector(".search-results").classList.remove("hidden");

      const results = allClubs.filter(
        (club) =>
          club.clubname.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
            -1 ||
          club.address.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
            -1
      );

      setClubsResults(results);
    } else {
      document.querySelector(".search-results").classList.add("hidden");
    }
  }

  async function updateInputDate(inputDate) {
    setInputDate(inputDate);
    setDate(new Date(inputDate));

    await schedule(new Date(inputDate));

    if (club.length !== 0) await schedule(new Date(inputDate), club);
    else {
      if (
        new Date(inputDate).getFullYear() ===
          new Date(Date.now()).getFullYear() &&
        new Date(inputDate).getMonth() === new Date(Date.now()).getMonth() &&
        new Date(inputDate).getDate() === new Date(Date.now()).getDate()
      ) {
        const timeNow = new Date(Date.now()).getHours();
        const updateAvailableHours = [...hours].filter(
          (hour) => hour > timeNow
        );
        setAvailableHours(updateAvailableHours);
      } else setAvailableHours(hours);
    }
    setTime("");
    document.querySelector(".next-button").classList.add("not-clickable");
  }

  async function clickOnTime(time, valid) {
    if (!valid) return;
    setTime(time);
    await schedule(date, "", time);

    if (club.length !== 0)
      document.querySelector(".next-button").classList.remove("not-clickable");
  }

  function clickOnClub(clubToken) {
    if (!clubToken) return;
    setClub(clubToken);

    // if (time === "") schedule(date, clubToken);
    schedule(date, clubToken);

    if (time !== "")
      document.querySelector(".next-button").classList.remove("not-clickable");
  }

  async function loadClubs(coords) {
    var rawResponse = await fetch("/clubs/all");
    var response = await rawResponse.json();

    setAllClubs(response.data.clubs);
    sortClubs(coords, response.data.clubs);
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

    if (club.length === 0) {
      console.log(response.data.availabilities);
      setAvailableClubs(response.data.availabilities);
    } else {
      const times = response.data.availabilities.map(
        (availability) => availability.time
      );

      if (
        date.getFullYear() === new Date(Date.now()).getFullYear() &&
        date.getMonth() === new Date(Date.now()).getMonth() &&
        date.getDate() === new Date(Date.now()).getDate()
      ) {
        const timeNow = new Date(Date.now()).getHours();
        const updateAvailableHours = times.filter((time) => time > timeNow);
        setAvailableHours(updateAvailableHours);
      } else setAvailableHours(times);
    }
  }

  function getDateInNiceFormat(date) {
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const storage1 = localStorage.getItem("type");
    if (JSON.parse(storage1) !== "player") setType(false);
    const storage = localStorage.getItem("token");
    if (storage) setToken(JSON.parse(storage));
    else setToken(false);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setMapPosition({ lat, lng });
          setCurrentPosition({ lat, lng });
          loadClubs({ lat, lng });
        },
        function () {
          alert("Could not get your position");
          const lat = 50.84;
          const lng = 4.36;
          setMapPosition({ lat, lng });
          setCurrentPosition({ lat, lng });
          loadClubs({ lat, lng });
        }
      );
    }

    const timeNow = new Date(Date.now()).getHours();
    const updateAvailableHours = [...hours].filter((hour) => hour > timeNow);
    setAvailableHours(updateAvailableHours);

    let currentReservation = "";
    const storage2 = localStorage.getItem("currentReservation");

    if (storage) currentReservation = JSON.parse(storage2);

    if (currentReservation && currentReservation !== "") {
      setInputDate(getDateInNiceFormat(new Date(currentReservation.date)));
      setDate(new Date(currentReservation.date));
      setClub(currentReservation.club);
      setTime(currentReservation.time);
      schedule(new Date(currentReservation.date), "", currentReservation.time);
      schedule(new Date(currentReservation.date), currentReservation.club);
      document.querySelector(".next-button").classList.remove("not-clickable");
    } else {
      setInputDate(getDateInNiceFormat(new Date(Date.now())));
      schedule(date);
    }
  }, []);

  if (token === false || type === false) {
    return <Redirect to="/signin" />;
  } else if (next) {
    return <Redirect to="/reservation/overview" />;
  } else {
    return (
      <div>
        <NavbarMainPage />
        <div
          className="reservation-section margin-top"
          onClick={(e) => {
            if (!e.target.closest(".club-result")) {
              setSearchLocation("");
              document.querySelector(".search-results").classList.add("hidden");
            }
          }}
        >
          {/* <div className="reservation-main-title-section"> */}
          {/* <hr className="horizontalRule2"></hr> */}
          {/* <h1 id="title" className="reservation-main-title">
            Book Now
          </h1> */}
          {/* <hr className="horizontalRule2"></hr> */}
          {/* </div> */}
          <div className="when-and-where">
            <div className="when">
              <div className="when-and-where-header">
                <h4 className="when-and-where-main-title">When ?</h4>
                <h6 className="when-and-where-second-title">
                  Choose the perfect time for you:
                </h6>
                <h5 className="current-infos">
                  {" "}
                  {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()},{" "}
                  {time === "" ? "..." : time}h -{" "}
                  {time === "" ? "..." : +time + 1 < 24 ? +time + 1 : "00"}h
                </h5>
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
                  Choose the perfect club for you:
                </h6>
                <h5 className="current-infos">
                  {" "}
                  {allClubs.find((c) => c.token === club)
                    ? allClubs.find((c) => c.token === club).clubname
                    : "..."}
                </h5>
                <div className="search-club">
                  <form className="location-form when-input-style">
                    <input
                      type="text"
                      id="location-input"
                      name="date"
                      placeholder={"Club, City, ... "}
                      value={searchLocation}
                      onChange={(e) => handlerSearchLocation(e)}
                    />
                    <label>
                      <FontAwesomeIcon
                        className="search-icon"
                        icon={faSearch}
                      />
                    </label>
                  </form>
                  <div className="search-results hidden">
                    {renderSearchResults(clubsResults, availableClubs, club)}
                  </div>
                </div>
              </div>
              <div className="where-content">
                <MapContainer
                  className="map-container"
                  // center={mapPosition}
                  zoom={6}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  ></TileLayer>
                  {generatePopups(allClubs)}
                  {renderCurrentPosition(currentPosition)}
                  <MinimapBounds coords={mapPosition} loading={loading} />
                </MapContainer>
                <div className="clubs-cards">
                  {renderClubCards(sortAllClubs, availableClubs, club)}
                </div>
              </div>
            </div>
          </div>
          <div className="reservation-buttons">
            <button
              className="yellowButton reservation-button"
              onClick={() => handleReset()}
            >
              Reset
            </button>
            <button
              type="submit"
              className="next-button yellowButton not-clickable reservation-button"
              onClick={(e) => handleNext(e)}
            >
              Next
            </button>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

export default Reservation;
