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
  password: {
    type: String,
    required: [true, "Please provide a password!"], // required field with custom error message
    unique: false, // not a unique field
  },
});

// export User model with collection name and schema
module.exports = mongoose.model("Users", UserSchema, "users");
