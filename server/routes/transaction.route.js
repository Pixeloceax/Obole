const express = require("express");
const Router = express.Router();
const User = require("../db/userModel");
const Transaction = require("../db/transactionModel");

Router.post("/transaction", async (req, res) => {
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

module.exports = Router;
