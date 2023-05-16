const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  sourceAccount: {
    type: String, // Compte Number of the source account
    required: true,
  },
  destinationAccount: {
    type: String, // Compte Number of the destination account
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  type: {
    type: String,
    enum: ["Dépôt", "Retrait", "Virement"],
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "pending", "cancelled"],
    default: "pending",
  },
});

module.exports = mongoose.model(
  "Transactions",
  transactionSchema,
  "transactions"
);
