var mongoose = require("mongoose");
const validator = require("validator");

const gameSchema = new mongoose.Schema({
  day: String,
  date: Date,
  time: String,
  club: String,
  price: Number,
  phone: String,
  email: String,
});

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide a firstname"],
  },
  lastname: {
    type: String,
    required: [true, "Please provide a lastname"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "invalid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    // minlength: [8, "Your password should have at least 8 characters"],
  },
  token: {
    type: String,
    required: true,
  },
  games: [gameSchema],
});

var userModel = mongoose.model("users", userSchema);

module.exports = userModel;
