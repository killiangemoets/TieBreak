var express = require("express");
var router = express.Router();
var userModel = require("../models/users");
var clubModel = require("../models/clubs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/schedule", async function (req, res, next) {
  try {
    const date = new Date(req.query.date);
    let availabilities;

    if (req.query?.club) {
      const club = await clubModel.findOne({ token: req.query.club });

      availabilities = club.availabilities.filter((availability) => {
        return (
          availability.date.getYear() == date.getYear() &&
          availability.date.getMonth() == date.getMonth() &&
          availability.date.getDay() == date.getDay()
        );
      });
    } else if (req.query?.time) {
      const clubs = await clubModel.find();
      availabilities = [];

      clubs.forEach((club) => {
        if (
          club.availabilities.find((availability) => {
            return (
              availability.date.getYear() == date.getYear() &&
              availability.date.getMonth() == date.getMonth() &&
              availability.date.getDay() == date.getDay() &&
              availability.time == req.query.time
            );
          })
        ) {
          availabilities.push({ clubname: club.clubname, token: club.token });
        }
      });
    } else {
      const clubs = await clubModel.find();
      availabilities = [];

      clubs.forEach((club) => {
        if (
          club.availabilities.find((availability) => {
            return (
              availability.date.getYear() == date.getYear() &&
              availability.date.getMonth() == date.getMonth() &&
              availability.date.getDay() == date.getDay()
            );
          })
        ) {
          availabilities.push({ clubname: club.clubname, token: club.token });
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

module.exports = router;
