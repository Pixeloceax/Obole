// external imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// routes imports
const registerRoute = require("./routes/register.route");
const loginRoute = require("./routes/login.route");
const dashboardRoute = require("./routes/dashboard.route");
const transactionRoute = require("./routes/transaction.route");
const carteRoute = require("./routes/carte.route");
const paymentRoute = require("./routes/payment.route");
const paymentStatisticsRoute = require("./routes/paymentStatistics.route");
const cors = require("cors");

// require database connection
const dbConnect = require("./db/dbConnect");
const auth = require("./utils/auth");

// execute database connection
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  cors({
    origin: "*",
  });

  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// default endpoint
app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

// register endpoint
app.post("/register", registerRoute);

// login endpoint
app.post("/login", loginRoute);

// dashboard endpoint
app.get("/dashboard", dashboardRoute);

// transaction endpoint
app.post("/transaction", transactionRoute);

// carte endpoint
app.get("/carte", carteRoute);

// payment endpoint
app.get("/payment", paymentRoute);
app.post("/paymentStatistics", paymentStatisticsRoute);

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth", auth, (request, response) => {
  console.log("in auth");
  response.send({ message: "You are authorized to access me" });
});

module.exports = app;
