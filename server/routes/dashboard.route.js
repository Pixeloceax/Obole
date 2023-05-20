const express = require("express");
const Router = express.Router();
const User = require("../db/userModel");

Router.get("/dashboard", async (req, res) => {
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

module.exports = Router;
