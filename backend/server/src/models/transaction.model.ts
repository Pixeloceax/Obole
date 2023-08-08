import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  sourceAccount: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 20,
  },
  destinationAccount: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 20,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
    trim: true,
    enum: ["USD", "EUR", "GBP", "JPY", "CAD"],
  },
  description: {
    type: String,
    default: "",
    trim: true,
    maxlength: 200,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  type: {
    type: String,
    enum: ["Deposit", "Withdrawal", "Transfer", "Credit"],
    required: true,
  },

  status: {
    type: String,
    enum: ["completed", "pending", "cancelled"],
    default: "pending",
  },
});

export default mongoose.model(
  "Transactions",
  transactionSchema,
  "transactions"
);
