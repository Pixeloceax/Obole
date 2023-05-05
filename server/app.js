// external imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

// require database connection
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const Transaction = require("./db/transactionModel");
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

const checkEmailExists = async (email) => {
  try {
    const user = await User.findOne({ "Information.email": email });
    if (user) {
      return true; // email already exists in the database
    } else {
      return false; // email does not exist in the database
    }
  } catch (error) {
    throw new Error(`Error checking if email exists: ${error}`);
  }
};

const sendEmail = async (email, password, compteNumber) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      secureConnection: false,
      port: 587,
      auth: {
        user: "obole1@outlook.fr",
        pass: "Oboleaxelcolas",
      },
    });

    const mailOptions = {
      from: "obole1@outlook.fr",
      to: email,
      subject: "Obole Bank - Votre mot de passe",
      text: `Votre mot de passe est ${password} et votre numéro de compte est ${compteNumber}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};

// register endpoint
app.post("/register", async (request, response) => {
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
      hashpassword,
    },
    Carte: {
      carteNumber,
      dateExpiration,
      code,
      CCV,
      plafond: 200,
    },
    Solde: {
      solde: 1000,
    },
    Livret: {
      type,
      soldeLivret,
    },
  });

  console.log(password + " " + user);

  sendEmail(email, password, compteNumber);

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

// login endpoint
app.post("/login", (request, response) => {
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

// Créer un endpoint pour récupérer les données d'un compte
app.get("/dashboard", async (req, res) => {
  const { _id } = req.query;

  try {
    const compte = await User.findOne({ _id: _id });
    if (!compte) {
      return res.status(404).json({ message: "Compte non trouvé" });
    }

    res.json(compte);
    return compte;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Créer un endpoint pour effectuer une transaction

app.post("/transaction", async (req, res) => {
  const { _id, montant, destinataire } = req.body;

  try {
    const compte = await User.findOne({ _id: _id });
    if (!compte) {
      return res.status(404).json({ message: "Compte non trouvé" });
    }

    const destinataireCompte = await User.findOne({
      "Compte.compteNumber": destinataire,
    });
    if (!destinataireCompte) {
      return res
        .status(404)
        .json({ message: "Compte destinataire non trouvé" });
    }

    if (compte.Solde.solde < montant) {
      return res.status(404).json({ message: "Solde insuffisant" });
    }

    compte.Solde.solde -= montant;
    destinataireCompte.Solde.solde += montant;

    await compte.save();
    await destinataireCompte.save();

    res.json(compte);
    return compte;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

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
