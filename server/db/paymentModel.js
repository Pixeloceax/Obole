const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  payment: {
    _id: {
      type: ObjectId,
      required: true,
    },
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

module.exports = mongoose.model("Payment", paymentSchema, "payment");
