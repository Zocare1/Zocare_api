const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/zo_care",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function (err) {
  if (err) {
    console.log(err);
  }
  // console.log("database connected");
});
module.exports = db;
