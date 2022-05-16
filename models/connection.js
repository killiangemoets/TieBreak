var mongoose = require("mongoose");

const password = "jx84kOWhlsraVVBD";

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  `mongodb+srv://admin:${password}@cluster0.ndvg0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  options,
  function (err) {
    console.log(err);
  }
);
