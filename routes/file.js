const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.post("/upload", async (req, res) => {
  if (req.files === null)
    return res.status(400).json({
      message: "File cannot be empty",
    });

  try {
    const file = req.files.file;

    let user = await User.findOne({ email: req.body.email });
    let x = file;
    if (user) {
      user.avatar = file.data.toString("base64");
      user.markModified("avatar");
      await user.save();

      return res.status(200).json({ avatar: file.data.toString("base64") });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "failed to upload image" });
  }
});
module.exports = router;
