var express = require("express");
var router = express.Router();
var userModel = require("../models/users");
var clubModel = require("../models/clubs");
var uid2 = require("uid2");
var bcrypt = require("bcrypt");

router.post("/sign-up", async function (req, res, next) {
  try {
    const hash =
      req.body.password.length > 0
        ? bcrypt.hashSync(req.body.password, 10)
        : req.body.password;

    const newUser = await userModel.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      image: req.body.image,
      password: hash,
      token: uid2(6),
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
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
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json({
        status: "fail",
        message:
          req.body.email.length === 0
            ? "Please provide an email address"
            : "email not found",
      });
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(404).json({
        status: "fail",
        message:
          req.body.password.length === 0
            ? "Please provide a password"
            : "password incorrect",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          user,
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

router.post("/games", async function (req, res, next) {
  try {
    const user = await userModel.findOne({ token: req.body.tokenUser });
    // const club = await clubModel.findOne({ token: req.body.tokenClub });

    user.games.push({
      day: req.body.day,
      date: req.body.date,
      time: req.body.time,
      price: req.body.price,
      clubToken: req.body.tokenClub,
      // club: req.body.clubname,
      // phone: club.phone,
      // email: club.email,
      // image: club?.image,
    });

    const userSaved = await user.save();

    res.status(201).json({
      status: "success",
      data: {
        user: userSaved,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.get("/games/:token", async function (req, res, next) {
  try {
    const user = await userModel.findOne({ token: req.params.token });
    res.status(200).json({
      status: "success",
      data: {
        games: user.games,
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
    const user = await userModel.findOne({ token: req.params.token });
    res.status(200).json({
      status: "success",
      data: {
        infos: user,
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
    // if (req.body.password.length < 8) {
    //   throw new Error(
    //     `${
    //       req.body.password.length === 0
    //         ? "zzz Please provide a password zzz"
    //         : "zzz Your password should have at least 8 characters zzz"
    //     } ${
    //       req.body.firstname.length === 0
    //         ? "xxx Please provide a firstname xxx"
    //         : ""
    //     } ${
    //       req.body.lastname.length === 0
    //         ? "www Please provide a lastname www"
    //         : ""
    //     } ${
    //       req.body.phone.length === 0
    //         ? "vvv Please provide a phone number vvv"
    //         : ""
    //     } ${
    //       req.body.email.length === 0
    //         ? "yyy Please provide an email address yyy"
    //         : ""
    //     }`
    //   );
    // }

    // const hash = bcrypt.hashSync(req.body.password, 10);
    const user = await userModel.findOneAndUpdate(
      { token: req.params.token },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        image: req.body.image,
        // password: hash,
      },
      {
        new: true,
        runValidators: true, // Thanks to that, the validators run again when we upadate a user( for example a password must have at least 8 characters)
      }
    );
    res.status(201).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.get("/all", async function (req, res, next) {
  try {
    const users = await userModel.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
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
