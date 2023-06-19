const express = require("express");
const Router = express.Router();
const User = require("../db/userModel");
const { sendEmail } = require("../utils/emailUtils");

Router.get("/carte", async (req, res) => {
  const { _id, type, index, newPlafond } = req.query;

  if (type == "delete") {
    try {
      const user = await User.findOne({ _id: _id });
      user.Carte.splice(index, 1);
      const updatedUser = await user.save();

      if (!updatedUser) {
        return res.status(404).json({ message: "Carte non trouvée" });
      }

      return res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  } else {
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
        sendEmail(
          (email = user.Information.email),
          (password = ""),
          (compteNumber = ""),
          carteNumber,
          code,
          CCV,
          dateExpiration,
          (typeOfCard = "newCard")
        );
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
  }
});

module.exports = Router;
