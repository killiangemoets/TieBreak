var mongoose = require("mongoose");
const validator = require("validator");

const availabilitySchema = new mongoose.Schema({
  date: Date,
  time: Number,
  courts: Number,
});

const reservationSchema = new mongoose.Schema({
  date: Date,
  time: Number,
  firstname: String,
  lastname: String,
  phone: String,
  email: String,
});

const clubSchema = new mongoose.Schema({
  clubname: {
    type: String,
    required: [true, "Please provide a club name"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  address: {
    type: String,
    required: [true, "Please provide an address"],
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
  },
  token: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: [true, "Please provide a location on the map"],
  },
  longitude: {
    type: Number,
    required: [true, "Please provide a location on the map"],
  },
  availabilities: [availabilitySchema],
  reservations: [reservationSchema],
});

var clubModel = mongoose.model("clubs", clubSchema);

module.exports = clubModel;
