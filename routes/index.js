const express = require("express");
const router = express.Router();
router.use("/verify", require("./verify"));
router.use("/user", require("./user"));
router.use("/file", require("./file"));
router.get("/ping", (req, res) => {
  return res.status(200).json({
    message: "success",
  });
});

module.exports = router;
