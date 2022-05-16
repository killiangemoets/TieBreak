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
    required: [true, "xxx Please provide a firstname xxx"],
  },
  lastname: {
    type: String,
    required: [true, "www Please provide a lastname www"],
  },
  phone: {
    type: String,
    required: [true, "vvv Please provide a phone number vvv"],
  },
  email: {
    type: String,
    required: [true, "yyy Please provide an email address yyy"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "yyy Please provide a valid email yyy"],
  },
  password: {
    type: String,
    required: [true, "zzz Please provide a password zzz"],
    // minlength: [8, "zzz Your password should have at least 8 characters zzz"],
  },
  token: {
    type: String,
    required: true,
  },
  games: [gameSchema],
});

var userModel = mongoose.model("users", userSchema);

module.exports = userModel;
