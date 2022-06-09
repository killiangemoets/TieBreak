var express = require("express");
var router = express.Router();
var clubModel = require("../models/clubs");
var userModel = require("../models/users");
var uid2 = require("uid2");
var bcrypt = require("bcrypt");

router.post("/sign-up", async function (req, res, next) {
  try {
    const hash =
      req.body.password.length > 0
        ? bcrypt.hashSync(req.body.password, 10)
        : req.body.password;
    const newClub = await clubModel.create({
      clubname: req.body.clubname,
      price: req.body.price,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      password: hash,
      token: uid2(6),
      image: req.body.image,
    });

    res.status(201).json({
      status: "success",
      data: {
        club: newClub,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.post("/sign-in", async function (req, res, next) {
  try {
    const club = await clubModel.findOne({ email: req.body.email });

    if (!club) {
      res.status(404).json({
        status: "fail",
        message:
          req.body.email.length === 0
            ? "please provide an email address"
            : "email not found",
      });
    } else if (!bcrypt.compareSync(req.body.password, club.password)) {
      res.status(404).json({
        status: "fail",
        message:
          req.body.password.length === 0
            ? "please provide a password"
            : "password incorrect",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          club,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.get("/all", async function (req, res, next) {
  try {
    const clubs = await clubModel.find();

    res.status(200).json({
      status: "success",
      results: clubs.length,
      data: {
        clubs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.post("/reservations", async function (req, res, next) {
  try {
    const club = await clubModel.findOne({ token: req.body.tokenClub });
    // const user = await userModel.findOne({ token: req.body.tokenUser });

    club.reservations.push({
      date: req.body.date,
      time: req.body.time,
      userToken: req.body.tokenUser,
      // firstname: user.firstname,
      // lastname: user.lastname,
      // phone: user.phone,
      // email: user.email,
      // image: user?.image,
    });

    const date = new Date(req.body.date);

    club.availabilities.forEach((availability) => {
      if (
        availability.date.getFullYear() == date.getFullYear() &&
        availability.date.getMonth() == date.getMonth() &&
        availability.date.getDate() == date.getDate() &&
        availability.time == req.body.time
      ) {
        availability.courts -= 1;
      }
    });

    const clubSaved = await club.save();

    res.status(201).json({
      status: "success",
      data: {
        club: clubSaved,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.post("/availabilities", async function (req, res, next) {
  try {
    const club = await clubModel.findOne({ token: req.body.token });

    club.availabilities.push({
      date: req.body.date,
      time: req.body.time,
      courts: req.body.courts,
    });

    const clubSaved = await club.save();

    res.status(201).json({
      status: "success",
      data: {
        club: clubSaved,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.get("/infos/:token", async function (req, res, next) {
  try {
    const club = await clubModel.findOne({ token: req.params.token });

    res.status(200).json({
      status: "success",
      data: {
        infos: club,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.patch("/infos/:token", async function (req, res, next) {
  try {
    const club = await clubModel.findOneAndUpdate(
      { token: req.params.token },
      {
        clubname: req.body.clubname,
        price: req.body.price,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        image: req.body.image,
      },
      {
        new: true,
        runValidators: true, // Thanks to that, the validators run again when we upadate a user( for example a password must have at least 8 characters)
      }
    );
    res.status(201).json({
      status: "success",
      data: {
        club: club,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.post("/infos", async function (req, res, next) {
  try {
    const club = await clubModel.findOne({ token: req.body.token });

    req.body.changes.forEach((change) => {
      if (
        club.availabilities.find(
          (availability) =>
            new Date(availability.date).getFullYear() ===
              new Date(change.date).getFullYear() &&
            new Date(availability.date).getMonth() ===
              new Date(change.date).getMonth() &&
            new Date(availability.date).getDate() ===
              new Date(change.date).getDate() &&
            +availability.time === +change.time
        )
      ) {
        console.log("yes");
        club.availabilities.forEach((availability) => {
          if (
            new Date(availability.date).getFullYear() ===
              new Date(change.date).getFullYear() &&
            new Date(availability.date).getMonth() ===
              new Date(change.date).getMonth() &&
            new Date(availability.date).getDate() ===
              new Date(change.date).getDate() &&
            +availability.time === +change.time
          ) {
            availability.courts = change.courts;
          }
        });
      } else {
        console.log("no");

        club.availabilities.push({
          date: new Date(change.date),
          time: change.time,
          courts: change.courts,
        });
      }
    });

    const clubSaved = await club.save();

    res.status(201).json({
      status: "success",
      data: {
        club: clubSaved,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

module.exports = router;
