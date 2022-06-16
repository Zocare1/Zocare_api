const confirmationMailer = require("../mailers/confirmation_mailer");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const TempUser = require("../models/tempUser");
const CryptoJs = require("crypto-js");
const fileUpload = require("express-fileupload");
const sendEmail = require("../config/sendinblue").sendEmail;
const {
  client,
  getValue,
  setKey,
  setKeyWithExpiry,
} = require("../config/redis");
const fs = require("fs");
const { default: axios } = require("axios");
// const { hash } = require('bcrypt')

const validateHuman = async (token) => {
  const secret = "to be set later"; //to be set later
  axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
    )
    .then(
      (res) => {
        console.log(res.data, "hogya ");
      },
      (err) => {
        console.log(err, "err  ");
      }
    );
};

module.exports.create = async (req, res) => {
  try {
    // const bytes = CryptoJs.AES.decrypt(req.body.password, "to be set later");
    let user1 = await User.findOne({ email: req.body.email });
    let user2 = await TempUser.findOne({ email: req.body.email });
    if (user2) {
      await TempUser.deleteOne({ email: req.body.email });
    }
    if (user1) {
      return res.status(236).json({
        message: "Email already registered",
      });
    } else {
      let newUser = await TempUser.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        verified: false,
        records: [],
        dogeCoins: 0,
      });

      if (newUser) {
        const verificationToken = jwt.sign(
          {
            userId: newUser._id,
          },
          "to be set later", //to be set later
          {
            expiresIn: "1d",
          }
        );

        const url = `http://localhost:3000/verify/${verificationToken}`;

        // if (confirmationMailer.newMail({ url: url, email: newUser.email })) {
        //   return res.json(200, {
        //     token: verificationToken,
        //   });
        // }

        const sent = sendEmail({
          email: newUser.email,
          name: newUser.name,
          subject: "Verify your account",
          content: url,
        });
        if (sent) {
          return res.json(200, {
            token: verificationToken,
          });
        }
        return res.status(500).json({
          message: "internal server error",
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json(404, {
      token: verificationToken,
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    // if (!validateHuman(req.body.token)) {
    //   return res.status(200).json({
    //     message: "You fuckin bitch!! Get Lost",
    //   });
    // }
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(256).json({
        message: "No account exists with this email",
      });
    }
    // console.log(req.body);
    const bytes = CryptoJs.AES.decrypt(req.body.password, "to be set later"); //to be set later;
    const pass1 = bytes.toString(CryptoJs.enc.Utf8);
    const bytes2 = CryptoJs.AES.decrypt(user.password, "to be set later"); // to be set later
    const pass2 = bytes2.toString(CryptoJs.enc.Utf8);
    console.log(pass1, pass2);
    if (pass1.toString() !== pass2.toString()) {
      return res.status(256).json({ message: "Invalid credentials" });
    }

    const Token = jwt.sign(
      { email: user.email, name: user.name, _id: user._id },
      "to be set later",
      {
        expiresIn: "10000h",
      }
    );
    console.log("token generated");
    return res.status(200).json({
      message: "Login successful",
      token: Token,
      user: { ...user._doc, _id: null },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
