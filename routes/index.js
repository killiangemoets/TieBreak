var express = require("express");
var router = express.Router();
// var userModel = require("../models/users");
var clubModel = require("../models/clubs");

const stripe = require("stripe")(
  "sk_test_51KjexnJNQutKRIOsRcOA3IOshaqmr6hANOTiJIiVdrsajHQcOZ2yDtXB2fttQnvGN1sHhSRUzDy5XY1yg2B1ITgq00DVdoxPnk"
);
const YOUR_DOMAIN = "http://localhost:3001";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/schedule", async function (req, res, next) {
  try {
    const date = new Date(req.query.date);
    let availabilities;

    if (req.query?.club && req.query?.club.length !== 0) {
      const club = await clubModel.findOne({ token: req.query.club });

      availabilities = club.availabilities.filter((availability) => {
        return (
          availability.date.getFullYear() == date.getFullYear() &&
          availability.date.getMonth() == date.getMonth() &&
          availability.date.getDate() == date.getDate() &&
          availability.courts > 0
        );
      });
    } else if (req.query?.time && req.query?.time.length !== 0) {
      const clubs = await clubModel.find();
      availabilities = [];

      clubs.forEach((club) => {
        if (
          club.availabilities.find((availability) => {
            return (
              availability.date.getFullYear() == date.getFullYear() &&
              availability.date.getMonth() == date.getMonth() &&
              availability.date.getDate() == date.getDate() &&
              availability.time == req.query.time &&
              availability.courts > 0
            );
          })
        ) {
          // availabilities.push({ clubname: club.clubname, token: club.token });
          availabilities.push(club.token);
        }
      });
    } else {
      const clubs = await clubModel.find();
      availabilities = [];

      clubs.forEach((club) => {
        if (
          club.availabilities.find((availability) => {
            return (
              availability.date.getFullYear() == date.getFullYear() &&
              availability.date.getMonth() == date.getMonth() &&
              availability.date.getDate() == date.getDate() &&
              availability.courts > 0
            );
          })
        ) {
          // availabilities.push({ clubname: club.clubname, token: club.token });
          availabilities.push(club.token);
        }
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        availabilities,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.post("/create-checkout-session", async function (req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: req.body.title,
            },
            unit_amount: req.body.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/reservation/confirmation`,
      cancel_url: `${YOUR_DOMAIN}/reservation`,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/news", async function (req, res, next) {
  try {
    // toISOString()
    console.log("hey");
    if (req.query?.date && req.query.date !== "") {
      const date = new Date(req.query.date);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const day = ("0" + date.getDate()).slice(-2);
      console.log(`${year}-${month}-${day}`);
      request = `/matches-by-date/${year}-${month}-${day}`;
    }
    if (req.query?.rakings && req.query.rakings !== "")
      request = `/matches-by-date/rankings/${req.body?.rakings}`;

    const rawResponse = await fetch(
      `https://tennis-live-data.p.rapidapi.com/${request}`,
      {
        method: "GET",
        headers: {},
      }
    );
    const response = await rawResponse.json();

    res.status(200).json({
      status: "success",
      data: {
        response,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
});

module.exports = router;
