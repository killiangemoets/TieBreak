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
    required: [true, "xxx Please provide a club name xxx"],
  },
  price: {
    type: Number,
    required: [true, "www Please provide a price www"],
  },
  phone: {
    type: String,
    required: [true, "vvv Please provide a phone number vvv"],
  },
  address: {
    type: String,
    required: [true, "aaa Please provide an address aaa"],
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
    minlength: [8, "zzz Your password should have at least 8 characters zzz"],
  },
  token: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: [true, "mmm Please provide a location on the map mmm"],
  },
  longitude: {
    type: Number,
    required: [true, "mmm Please provide a location on the map mmm"],
  },
  availabilities: [availabilitySchema],
  reservations: [reservationSchema],
});

var clubModel = mongoose.model("clubs", clubSchema);

module.exports = clubModel;
