import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  payment: {
    CompteNumber: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
});

export default mongoose.model("Payment", paymentSchema, "payment");
