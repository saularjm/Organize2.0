require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const routes = require("./routes");
// const cors = require("cors");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//port
const PORT = process.env.PORT || 3001;

// Passport Config
require("./config/passport")(passport);

// middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// cors
// app.use(
//   cors({
//     origin: "http://localhost:3001",
//     credentials: true,
//     saveUninitialized: true,
//   })
// );
app.use(
  session({
    secret: "svsas",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("svsas"));

//routes
app.use(routes);
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/events", require("./routes/api/events"));
app.use("/api/articles", require("./routes/api/articles"));
app.use("/api/links", require("./routes/api/links"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/auth")(passport);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
console.log();
