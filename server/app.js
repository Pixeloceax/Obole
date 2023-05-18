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
      subject: "Détails de votre compte bancaire Obole",
      text: `Cher(e) client(e),

Nous tenons à vous remercier de votre confiance envers Obole, votre banque de confiance. Dans le cadre de notre engagement à fournir un service bancaire de qualité, nous avons le plaisir de vous envoyer les informations relatives à votre compte bancaire.

Votre numéro de compte est le suivant : ${compteNumber}. Veuillez conserver cette information en lieu sûr et ne jamais la divulguer à quiconque.

De plus, veuillez trouver ci-dessous votre mot de passe pour accéder à votre espace bancaire en ligne :

Mot de passe : ${password}
Nous vous recommandons de changer régulièrement votre mot de passe pour garantir la sécurité de votre compte. Nous vous conseillons également de ne jamais divulguer votre mot de passe à quiconque.

Si vous rencontrez des problèmes pour accéder à votre compte bancaire en ligne, n'hésitez pas à contacter notre service clientèle disponible 24 heures sur 24 et 7 jours sur 7.

Nous espérons que vous trouverez ces informations utiles. Nous restons à votre disposition pour toute demande d'informations complémentaires.

Cordialement,

L'équipe Obole`,
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
      utilisé: 50,
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
  try {
    const {
      sourceAccount,
      destinationAccount,
      amount,
      currency,
      description,
      type,
    } = req.body;

    // Vérifier si le compte source a suffisamment d'argent pour le virement
    const sourceBalance = await getAccountBalance(sourceAccount);
    const destinationBalance = await getAccountBalance(destinationAccount);

    // Vérifier l'identité de l'utilisateur connecté
    const _id = req.body._id;
    const user = await User.findOne({
      _id: _id,
      "Compte.compteNumber": sourceAccount,
    });

    if (!user) {
      return res.status(401).json({
        error: "Vous n'êtes pas autorisé à effectuer cette transaction.",
      });
    }

    if (sourceBalance < amount) {
      return res.status(400).json({
        error: "Fonds insuffisants pour effectuer le virement.",
      });
    }

    // Vérifier si le compte source et le compte destination sont différents
    if (sourceAccount === destinationAccount) {
      return res.status(400).json({
        error:
          "Le compte source et le compte destination doivent être différents.",
      });
    }

    // Mettre à jour les soldes des comptes source et destination
    const newSourceBalance = sourceBalance - amount;
    const newDestinationBalance =
      parseFloat(destinationBalance) + parseFloat(amount);

    // Effectuer les mises à jour dans la base de données
    await updateAccountBalance(sourceAccount, newSourceBalance);
    await updateAccountBalance(destinationAccount, newDestinationBalance);

    // Créer une nouvelle instance de la transaction
    const newTransaction = new Transaction({
      sourceAccount,
      destinationAccount,
      amount,
      currency,
      description,
      type,
    });

    // Enregistrer la transaction dans la base de données
    const savedTransaction = await newTransaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la création de la transaction.",
    });
  }
});

// Fonction pour obtenir le solde d'un compte
async function getAccountBalance(compteNumber) {
  try {
    const user = await User.findOne({ "Compte.compteNumber": compteNumber });
    if (!user) {
      throw new Error("Compte non trouvé");
    }
    return user.Solde.solde;
  } catch (error) {
    throw new Error("Erreur lors de la récupération du solde du compte.");
  }
}

// Fonction pour mettre à jour le solde d'un compte
async function updateAccountBalance(compteNumber, newBalance) {
  try {
    const user = await User.findOneAndUpdate(
      { "Compte.compteNumber": compteNumber },
      { $set: { "Solde.solde": newBalance } },
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      throw new Error("Compte non trouvé");
    }
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour du solde du compte.");
  }
}

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth", auth, (request, response) => {
  console.log("in auth");
  response.send({ message: "You are authorized to access me" });
});

app.get("/carte", async (req, res) => {
  const { _id, type, index, newPlafond } = req.query;

  try {
    const user = await User.findOne({ _id: _id });

    if (type === "verrouiller") {
      user.Carte[index].verrouiller = !user.Carte[index].verrouiller;
    } else if (type === "opposition") {
      user.Carte[index].opposition = !user.Carte[index].opposition;
    } else if (type === "plafond") {
      user.Carte[index].plafond = newPlafond;
    } else if (type === "ajouter") {
      const carteNumber = Math.floor(Math.random() * 10000000000000000);
      const date = new Date();
      date.setFullYear(date.getFullYear() + 5);
      const month = date.getMonth() + 1;
      const year = date.getFullYear().toString().slice(-2);
      const dateExpiration = `${month.toString().padStart(2, "0")}/${year}`;
      const code = Math.floor(Math.random() * 10000);
      const CCV = Math.floor(Math.random() * 1000);
      user.Carte.push({
        carteNumber,
        dateExpiration,
        code,
        CCV,
        plafond: 2000,
        utilisé: 25,
      });
    }

    const updatedUser = await user.save();

    if (!updatedUser) {
      return res.status(404).json({ message: "Carte non trouvée" });
    }

    return res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = app;
