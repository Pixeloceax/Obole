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

// require database connection
const dbConnect = require("./db/dbConnect");
const auth = require("./utils/auth");

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
app.post("/register", registerRoute);

// login endpoint
app.post("/login", loginRoute);

// dashboard endpoint
app.get("/dashboard", dashboardRoute);

// transaction endpoint
app.post("/transaction", transactionRoute);

// carte endpoint
app.get("/carte", carteRoute);

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

app.get("/payment", async (req, res) => {
  const { number_carte, date, ccv, montant } = req.query;

  try {
    const user = await User.findOne({
      "Carte.carteNumber": Number(number_carte),
      "Carte.CCV": Number(ccv),
      "Carte.dateExpiration": date,
    });

    if (user) {
      const carte = user.Carte.find(
        (carte) =>
          carte.carteNumber === Number(number_carte) &&
          carte.CCV === Number(ccv) &&
          carte.dateExpiration === date
      );

      if (carte && !carte.verrouiller && !carte.opposition) {
        const montantUtilise = carte.utilisé;
        const plafond = carte.plafond;

        if (montantUtilise + Number(montant) <= plafond) {
          carte.utilisé = montantUtilise + Number(montant);
          user.Solde.solde = user.Solde.solde - Number(montant);
          await user.save();

          console.log("Paiement effectué avec succès.");
        } else {
          console.log(
            "Impossible de faire le paiement. Montant dépassant le plafond."
          );
        }
      } else {
        console.log(
          "Impossible de faire le paiement. La carte est verrouillée ou en opposition."
        );
      }
    } else {
      console.log("Impossible de faire le paiement. Utilisateur introuvable.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la recherche de l'utilisateur.",
    });
  }
});

module.exports = app;
