const express = require("express");
const passport = require("passport");
const router = express.Router();
const usersController = require("../controllers/usersController");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
getData = async (req, res) => {
  try {
    // console.log("token ...____________________", req.params.token);
    jwt.verify(req.params.token, "to be set later", async (err, t) => {
      if (err) {
        // console.log(err);
        return res.status(404).json({ message: "internal server error" });
      }
      // console.log("decrypted ", t)
      const ID = t._id;
      // console.log("userId .........................................................", ID);
      let user = await User.findById(ID);

      if (user) {
        // const avatar = await getUserImage(user._id + ".png");
        return res.status(200).json({
          name: user.name,
          email: user.email,
          gender: user.gender,
          DOB: user.DOB,
          country: user.country,
          avatar: user.avatar?.toString("base64"),
        });
      } else {
        return res.status(235).json({
          message: "userNotFound",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
router.post("/create", usersController.create);
router.post("/create-session", usersController.createSession);
// router.post('/getId',usersController.getId)
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  usersController.logout
);
router.post("/updateUserRecords/:token", usersController.updateUserRecords);
router.post(
  "/updateUserRaceRecords/:token",
  usersController.updateUserRaceRecords
);
router.post("/updateDogeCoins/:token", usersController.updateDogeCoins);
router.get("/getData/:token", getData);
router.post(
  "/updateUserData/:email",

  usersController.updateUserData
);
router.post("/updateSettings", usersController.updateSettings);

module.exports = router;
