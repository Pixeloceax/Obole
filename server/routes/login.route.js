const express = require("express");
const Router = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//import models
const User = require("../db/userModel");
const Logs = require("../db/connectionLogModel");

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

        // save login information
        // const connectionLog = new Logs({
        //   _id: user._id,
        //   CompteNumber: user.Compte.compteNumber,
        //   date: new Date(),
        //   ip: request.ip,
        //   userAgent: request.headers["user-agent"],
        // });
        // connectionLog.save();
      }
    })
    // catch error if CompteNumber does not exist
    .catch((e) => {
      response.status(404).send({
        message: "CompteNumber was not found",
        e,
      });
    });
});

module.exports = Router;
