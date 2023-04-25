const mongoose = require("mongoose");

// define a user schema using mongoose.Schema class
const UserSchema = new mongoose.Schema({
  // email field with validation rules
  email: {
    type: String,
    required: [true, "Please provide an Email!"], // required field with custom error message
    unique: [true, "Email Exist"], // unique field with custom error message
  },

  // password field with validation rules
  hashpassword: {
    type: String,
    required: [true, "Please provide a password!"], // required field with custom error message
    unique: false, // not a unique field
  },

  // nom field with validation rules
  nom: {
    type: String,
    required: [true, "Please provide a nom!"], // required field with custom error message
    unique: false, // not a unique field
  },

  // prenom field with validation rules
  prenom: {
    type: String,
    required: [true, "Please provide a prenom!"], // required field with custom error message
    unique: false, // not a unique field
  },

  // tel field with validation rules
  tel: {
    type: Number,
    required: [true, "Please provide a tel!"], // required field with custom error message
    unique: false, // not a unique field
  },

  // adresse field with validation rules
  adresse: {
    type: String,
    required: [true, "Please provide a adresse!"], // required field with custom error message
    unique: false, // not a unique field
  },

  // gendre field with validation rules
  gender: {
    type: String,
    required: [true, "Please provide a adresse!"], // required field with custom error message
    unique: false, // not a unique field
  },

  // compteNumber field with validation rules
  compteNumber: {
    type: Number,
    required: [true, "Please provide a compteNumber!"], // required field with custom error message
    unique: true, // not a unique field
  },
});

// export User model with collection name and schema
module.exports = mongoose.model("Users", UserSchema, "users");
