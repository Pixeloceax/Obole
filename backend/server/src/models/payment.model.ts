import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true,
  },
  cardNumber: {
    type: Number,
    required: true,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Payment", paymentSchema, "payment");
