const express = require("express");
const Router = express.Router();
const User = require("../db/userModel");

Router.get("/carte", async (req, res) => {
  const { _id, type, index } = req.query;

  try {
    const user = await User.findOne({ _id: _id });

    if (type === "verrouiller") {
      user.Carte[index].verrouiller = !user.Carte[index].verrouiller;
    } else if (type === "opposition") {
      user.Carte[index].opposition = !user.Carte[index].opposition;
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

module.exports = Router;
