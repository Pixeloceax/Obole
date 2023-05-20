const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
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
  ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Logs", logSchema, "logs");
