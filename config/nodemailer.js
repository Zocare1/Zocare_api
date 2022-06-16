const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: "example@gmail.com",//to be set later
    pass: "*****************",//to be set later
  },
});

let rendertemplate = (url, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../Views/mailers", relativePath),
    { url: url },
    function (err, template) {
      if (err) {
        console.log(err + " error in rendering template");
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter: transporter,
  rendertemplate: rendertemplate,
};
