const express = require("express");
const Router = express.Router();

const Payment = require("../db/paymentModel");

Router.post("/paymentStatistics", async (req, res) => {
  const _id = req.body._id;

  try {
    const paymentStatistics = await Payment.find({"payment._id": _id});
    return res.status(200).json(paymentStatistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = Router;
