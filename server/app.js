// external imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

// require database connection
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const auth = require("./auth");

// execute database connection
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
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
app.post("/register", (request, response) => {
  // hash the password
  const salt = uuidv4(); // generate random salt
  const password = request.body.password + salt; // add salt to the password
  const hash = crypto.createHash("sha256"); // create a sha256 hash object
  hash.update(password); // add password to hash object
  const hashedPassword = hash.digest("hex"); // get hashed password from hash object

  // create a new user instance and collect the data
  const user = new User({
    email: request.body.email,
    password: hashedPassword,
    salt: salt,
  });

  // save the new user
  user
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "User Created Successfully",
        result,
      });
    })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating user",
        error,
      });
    });
});

// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })
    // if email exists
    .then((user) => {
      // create a sha256 hash object
      const hash = crypto.createHash("sha256");
      // add password and salt to hash object
      hash.update(request.body.password + user.salt);
      // get hashed password from hash object
      const hashedPassword = hash.digest("hex");
      // compare the password entered and the hashed password found
      if (hashedPassword !== user.password) {
        response.status(401).send({
          message: "Passwords does not match",
        });
      } else {
        // create JWT token
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );

        // return success response
        response.status(200).send({
          message: "Login Successful",
          email: user.email,
          token,
        });
      }
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});

module.exports = app;
