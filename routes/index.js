var express = require("express");
var router = express.Router();
// var userModel = require("../models/users");
var clubModel = require("../models/clubs");

const stripe = require("stripe")(
  "sk_test_51KjexnJNQutKRIOsRcOA3IOshaqmr6hANOTiJIiVdrsajHQcOZ2yDtXB2fttQnvGN1sHhSRUzDy5XY1yg2B1ITgq00DVdoxPnk"
);
// const stripe = require("stripe")(
//   "pk_test_51KjexnJNQutKRIOsNHYfubdDtJjRblAZR8hXpPXAJRS6uu1LnRv0Xs9G3tBrOAVsap1ht8UlLQkrJ0hvl5CLROs6001t12xbfR"
// );

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

// middleWare = (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", true);
//   // res.header(
//   //   "Access-Control-Allow-Headers",
//   //   "Origin, X-Requested-With, Content-Type, Accept"
//   // );
//   console.log("hello from middleware");
//   next();
// };

async function goToStripe(req, res) {
  basket = [
    {
      price_data: {
        currency: "eur",
        product_data: {
          name: "Bruxelles",
        },
        unit_amount: 20 * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: basket,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/reservation/overview`,
    cancel_url: `${YOUR_DOMAIN}/reservation/confirmation`,
  });
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Credentials", true);
  res.redirect(303, session.url);
}

router.route("/create-checkout-session").post(goToStripe);

module.exports = router;
