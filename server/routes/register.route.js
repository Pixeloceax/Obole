const express = require("express");
const Router = express.Router();
const User = require("../db/userModel");
const crypto = require("crypto");

// import sendEmail && checkEmailExists functions
const { sendEmail, checkEmailExists } = require("../utils/emailUtils");

Router.post("/register", async (request, response) => {
  const nom = request.body.nom;
  const prenom = request.body.prenom;
  const email = request.body.email;
  const tel = request.body.tel;
  const adresse = request.body.adresse;
  const genre = request.body.genre;

  // check if email already exists
  const emailExists = await checkEmailExists(email);
  if (emailExists) {
    return response.status(400).send({
      message: "Email already exists",
    });
  }

  const compteNumber = Math.floor(Math.random() * 1000000000000);
  const password = Math.floor(Math.random() * 10000000000).toString();
  const hashpassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  const carteNumber = Math.floor(Math.random() * 10000000000000000);
  const date = new Date();
  date.setFullYear(date.getFullYear() + 5);
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);
  const dateExpiration = `${month.toString().padStart(2, "0")}/${year}`;
  const code = Math.floor(Math.random() * 10000);
  const CCV = Math.floor(Math.random() * 1000);
  const list = ["A", "Jeune"];
  const randomElement = list[Math.floor(Math.random() * list.length)];
  const type = randomElement;
  const soldeLivret = 1000;

  const user = new User({
    Information: {
      nom,
      prenom,
      tel,
      email,
      genre,
      adresse,
    },
    Compte: {
      compteNumber,
      password,
    },
    Carte: {
      carteNumber,
      dateExpiration,
      code,
      CCV,
      plafond: 200,
      utilisé: 0,
    },
    Solde: {
      solde: 1000,
    },
    Livret: {
      type,
      soldeLivret,
    },
  });

  // need to clean this
  console.log(password + " " + user);

  sendEmail(
    email,
    password,
    compteNumber,
    carteNumber,
    code,
    CCV,
    dateExpiration,
    typeOfCard="newUser"
  );

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
      console.log(error);
    });
});

module.exports = Router;
