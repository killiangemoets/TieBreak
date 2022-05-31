import React, { useState, useEffect } from "react";
import "../stylesheets/navbar.css";
import "../stylesheets/dashboard.css";
import "../stylesheets/general.css";
import { Redirect } from "react-router-dom";
import FooterPage from "../components/Footer";
import NavbarClub from "../components/NavbarClub";

import { Table } from "antd";

import { Chart as ChartJS } from "chart.js/auto";

import { Doughnut, Bar, Pie, Line } from "react-chartjs-2";

function Dashboard() {
  const [token, setToken] = useState("");
  const [type, setType] = useState("");

  const [availabilities, setAvailabilities] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [months] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Otcober",
    "November",
    "December",
  ]);
  const [weekdays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(Date.now()).getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    new Date(Date.now()).getFullYear()
  );

  function hideNavbar() {
    const navbar = document.querySelector(".navbarRight");
    const menuIcon = document.querySelector(".mobile-nav-menu-icon");
    const crossIcon = document.querySelector(".mobile-nav-cross-icon");
    navbar.classList.remove("nav-open");
    menuIcon.classList.remove("remove");
    crossIcon.classList.add("remove");
  }

  async function getClubInfos(token) {
    var rawResponse = await fetch(`../clubs/infos/${token}`);
    var response = await rawResponse.json();
    console.log(response);

    var rawResponsePlayers = await fetch(`../users/all`);
    var responsePlayers = await rawResponsePlayers.json();

    // console.log(responsePlayers);
    const reservations = response.data.infos.reservations.map((reservation) => {
      const user = responsePlayers.data.users.find(
        (user) => user.token === reservation.userToken
      );
      return {
        date: reservation.date,
        time: reservation.time,
        firstname: user?.firstname,
        lastname: user?.lastname,
        phone: user?.phone,
        email: user?.email,
        image: user?.image,
      };
    });
    setReservations(reservations);

    // setReservations(response.data.infos.reservations);
    setAvailabilities(response.data.infos.availabilities);
    renderReservationsByDay(reservations, currentYear, currentMonth);
  }

  function renderTable(reservations) {
    const columns = [
      {
        title: "Number of reservations",
        dataIndex: "numReservations",
        sorter: {
          compare: (a, b) => a.numReservations - b.numReservations,
          multiple: 3,
        },
      },

      {
        title: "Lastname",
        dataIndex: "lastname",
      },
      {
        title: "Firstname",
        dataIndex: "firstname",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Phone",
        dataIndex: "phone",
      },
    ];

    let players = [];
    reservations.forEach((reservation) => {
      const index = players.findIndex((player) => {
        return player.email === reservation.email;
      });
      if (index < 0) {
        players.push({
          firstname: reservation.firstname,
          lastname: reservation.lastname,
          email: reservation.email,
          phone: reservation.phone,
          reservations: 1,
        });
      } else {
        players[index].reservations += 1;
      }
    });

    players.sort(function (a, b) {
      return b.reservations - a.reservations;
    });

    const data = players.map((player, i) => {
      return {
        key: i + 1,
        numReservations: player.reservations,
        lastname: player.lastname,
        firstname: player.firstname,
        email: player.email,
        phone: player.phone,
      };
    });

    return (
      <Table
        className="table-players"
        columns={columns}
        dataSource={data}
        // size="small"
      />
    );
  }

  function renderReservationsByMonth(reservations) {
    let categories = [];
    reservations.forEach((reservation) => {
      const date = new Date(reservation.date);
      const month = date.getMonth();
      const year = date.getFullYear();

      const index = categories.findIndex((category) => {
        return category.month === month && category.year === year;
      });

      console.log(index);
      if (index < 0) {
        categories.push({
          year,
          month,
          count: 1,
        });
      } else {
        categories[index].count += 1;
      }
    });

    categories.sort(function (a, b) {
      if (a.year === b.year) {
        return a.month - b.month;
      } else {
        return new Date(a.year) - new Date(b.year);
      }
    });

    console.log(categories);
    let xAxis = [],
      yAxis = [];
    categories.forEach((category) => {
      xAxis.push(`${months[category.month]} ${category.year}`);
      yAxis.push(category.count);
    });

    const options = {
      plugins: {
        // title: {
        //   display: true,
        //   text: "Reservations by month",
        //   padding: {
        //     top: 10,
        //     bottom: 30,
        //   },
        // },
        legend: {
          display: false,
        },
      },
    };

    const data = {
      labels: xAxis,
      datasets: [
        {
          label: "Number of reservations",
          data: yAxis,
          backgroundColor: [
            "#9dab86",
            "#d8ddcf",
            "#a7b392",
            "#ced5c3",
            "#b1bc9e",
            "#c4cdb6",
            "#bac4aa",
          ],
          borderColor: ["#7e896b"],
          borderWidth: 0.6,
        },
      ],
    };

    return (
      <>
        <Bar className="chart-months" data={data} options={options} />
      </>
    );
  }

  function renderReservationsByWeekday(reservations) {
    let counts = [0, 0, 0, 0, 0, 0, 0];
    reservations.forEach((reservation) => {
      const day = new Date(reservation.date).getDay();
      counts[day] += 1;
    });

    console.log(counts);

    const options = {
      plugins: {
        // title: {
        //   display: true,
        //   text: "Reservations by weekday",
        //   padding: {
        //     top: 10,
        //     bottom: 30,
        //   },
        // },
        legend: {
          display: false,
        },
      },
    };

    const data = {
      labels: weekdays,
      datasets: [
        {
          label: "Number of reservations",
          data: counts,

          backgroundColor: [
            "#9dab86",
            "#a7b392",
            "#b1bc9e",
            "#bac4aa",
            "#c4cdb6",
            "#ced5c3",
            "#d8ddcf",
          ],
          borderColor: ["#7e896b"],

          borderWidth: 1,
        },
      ],
    };

    return (
      <>
        <Doughnut className="chart" data={data} options={options} />
      </>
    );
  }

  function renderProportionReservations(reservations, availabilities) {
    const numReservedCourts = reservations.length;
    let numUnreservedCourts = 0;
    availabilities.forEach((availability) => {
      numUnreservedCourts += availability.courts;
    });
    numUnreservedCourts -= numReservedCourts;

    const options = {
      plugins: {
        // title: {
        //   display: true,
        //   text: "Reservations by weekday",
        //   padding: {
        //     top: 10,
        //     bottom: 30,
        //   },
        // },
        legend: {
          display: false,
        },
      },
    };

    const data = {
      labels: ["Reserved courts", "Unreserved courts"],
      datasets: [
        {
          label: "Reserved tennis courts / Unreserved tennis courts",
          data: [numReservedCourts, numUnreservedCourts],
          backgroundColor: ["#9dab86", "#d8ddcf"],
          borderColor: ["#7e896b", "#7e896b"],
          borderWidth: 0.6,
        },
      ],
    };

    return (
      <>
        <Pie className="chart" data={data} options={options} />
      </>
    );
  }

  function renderReservationsByDay(reservations, year, month) {
    const numDaysInTheMonth = new Date(year, month + 1, 0).getDate();
    console.log(numDaysInTheMonth);
    const numReservations = Array(numDaysInTheMonth).fill(0);

    let days = [];
    for (let i = 1; i <= numDaysInTheMonth; i++) {
      days.push(i);
    }

    reservations.forEach((reservation) => {
      const date = new Date(reservation.date);
      if (date.getMonth() === month && date.getFullYear() === year) {
        numReservations[date.getDate() - 1] += 1;
      }
    });

    console.log(numReservations);
    console.log(days);

    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    const data = {
      labels: days,
      datasets: [
        {
          data: numReservations,
          backgroundColor: "#d8ddcf",
          borderColor: "#9dab86",
          borderWidth: 2,
          fill: {
            target: "origin",
            above: "#d8ddcf",
            below: "#d8ddcf",
          },
          lineTension: 0.6,
        },
      ],
    };

    return (
      <>
        <Line className="chart-day" data={data} options={options} />
      </>
    );
  }

  function renderYearsOptions() {
    let yearsOptions = [];
    for (let i = 1990; i <= 2030; i++) {
      if (i === currentYear)
        yearsOptions.push(
          <option value={i} selected>
            {i}
          </option>
        );
      else yearsOptions.push(<option value={i}>{i}</option>);
    }
    return yearsOptions;
  }

  useEffect(() => {
    const storage1 = localStorage.getItem("type");
    if (JSON.parse(storage1) !== "club") setType(false);
    const storage = localStorage.getItem("token");
    if (storage) {
      setToken(JSON.parse(storage));
      getClubInfos(JSON.parse(storage));
    } else setToken(false);

    document.getElementById("select-month").options[
      currentMonth
    ].selected = true;
  }, []);

  if (token === false || type === false) {
    return <Redirect to="/club/signin" />;
  } else {
    return (
      <div>
        <NavbarClub />
        <div
          className="container dashboard-section"
          onClick={() => hideNavbar()}
        >
          <div className="center-title calendar-title">
            <div className="calendar-consultation-title">
              <p>Dashboard</p>
            </div>
          </div>
          <div className="charts-grid">
            <div className="months-chart-div chart-div">
              <h6>Reservations by month</h6>
              {renderReservationsByMonth(reservations)}
            </div>
            <div className="weekdays-chart-div chart-div">
              <h6>Reservations per weekday</h6>
              {renderReservationsByWeekday(reservations)}
            </div>
            <div className="days-chart-div chart-div">
              <h6>Reservations per day</h6>
              {renderReservationsByDay(
                reservations,
                +currentYear,
                +currentMonth
              )}
              <form className="personnal-infos-form graph-form">
                <div className="input-div input-day">
                  <label className="label-month-and-year">Month:</label>
                  <select
                    id="select-month"
                    name="select-month"
                    onChange={(e) => setCurrentMonth(e.target.value)}
                  >
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">November</option>
                    <option value="10">Otcober</option>
                    <option value="11">December</option>
                  </select>
                </div>
                <div className="input-div input-day">
                  <label className="label-month-and-year">Year:</label>
                  <select
                    id="select-year"
                    name="select-year"
                    onChange={(e) => setCurrentYear(e.target.value)}
                  >
                    {renderYearsOptions()}
                  </select>
                </div>
              </form>
            </div>
            <div className="days-chart-div chart-div">
              <h6>Reserved Courts/Unreserved Courts</h6>
              {renderProportionReservations(reservations, availabilities)}
            </div>
          </div>
          <div className="list-players">
            <h6>The most regular players</h6>
            {renderTable(reservations)}
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

export default Dashboard;
