const express = require("express");
const Router = express.Router();

const User = require("../db/userModel");
const Payment = require("../db/paymentModel");

Router.get("/payment", async (req, res) => {
  const { number_carte, date, ccv, montant, type } = req.query;

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

          const paymentDonne = new Payment({
            payment: {
              _id: user._id,
              CompteNumber: user.Compte.compteNumber,
              date: new Date(),
              type: type,
              amount: Number(montant),
            },
          });
          paymentDonne.save();
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

module.exports = Router;
