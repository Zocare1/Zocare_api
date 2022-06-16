const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const client = require("./config/redis");
const db = require("./config/db");
const helmet = require("helmet");
const ejs = require("ejs");
const app = express();
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

app.use(express.static("./build"));
app.set("view-engine", "ejs");
const http = require("http").createServer(app);
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.set("views", "./build/views");
app.use(helmet());
const jwtStrategy = require("./config/passport-jwt-strategy");

var whitelist = [
  "http://localhost:3000",
  "https://type-right.vercel.app",
  "http://localhost:5000",
];
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
const raceSocket = require("./config/race_socket").raceSocket;

//cors
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.use("/", require("./routes/index.js"));

raceSocket(io);

http.listen(process.env.PORT || 8000, () => {
  console.log("running on port 8000");
});
