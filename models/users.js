const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    verified: Boolean,
    dogeCoins: Number,
    country: String,
    DOB: String,
    gender: String,
    avatar: String,
    otherDetails: {},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
