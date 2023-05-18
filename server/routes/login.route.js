const express = require("express");
const Router = express.Router();
const User = require("../db/userModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

Router.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ "Compte.compteNumber": request.body.compteNumber })
    // if email exists
    .then((user) => {
      const password = request.body.password;
      const hashpassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      if (hashpassword !== user.Compte.hashpassword) {
        response.status(401).send({
          message: "Passwords does not match",
        });
      } else {
        // create JWT token
        const token = jwt.sign(
          {
            _id: user._id,
            userCompteNumber: user.Compte.compteNumber,
          },
          "RANDOM-TOKEN",
          { expiresIn: "300s" }
        );

        // return success response
        response.status(200).send({
          message: "Login Successful",
          _id: user._id,
          token,
        });
      }
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "CompteNumber was not found",
        e,
      });
    });
});

module.exports = Router;
