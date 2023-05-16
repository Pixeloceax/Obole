const mongoose = require("mongoose");

// define a user schema using mongoose.Schema class
const UserSchema = new mongoose.Schema({
  Information: {
    nom: {
      type: String,
      required: [true, "Please provide a nom!"],
    },
    prenom: {
      type: String,
      required: [true, "Please provide a prenom!"],
    },
    tel: {
      type: String,
      required: [true, "Please provide a tel!"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email!"],
      unique: [true, "email already exists"],
    },
    genre: {
      type: String,
      required: [true, "Please provide a genre!"],
    },
    adresse: {
      type: String,
      required: [true, "Please provide an adresse!"],
    },
  },
  Compte: {
    compteNumber: {
      type: Number,
      required: [true, "Please provide a compteNumber!"],
      unique: [true, "Compte Number already exists"],
    },
    hashpassword: {
      type: String,
      required: [true, "Please provide a hashpassword!"],
    },
  },
  Carte: [
    {
      carteNumber: {
        type: Number,
        required: [true, "Please provide a carteNumber!"],
      },
      dateExpiration: {
        type: String,
        required: [true, "Please provide a dateExpiration!"],
      },
      code: {
        type: Number,
        required: [true, "Please provide a code!"],
      },
      CCV: {
        type: Number,
        required: [true, "Please provide a CCV!"],
      },
      verrouiller: {
        type: Boolean,
        default: false,
      },
      opposition: {
        type: Boolean,
        default: false,
      },
      plafond: {
        type: Number,
        required: [true, "Please provide a plafond!"],
      },
      utilisé: {
        type: Number,
        required: [true, "Please provide a utilisé!"],
      },
    },
  ],
  Solde: {
    solde: {
      type: Number,
      required: [true, "Please provide a solde!"],
    },
  },
  Livret: [
    {
      type: {
        type: String,
        required: [true, "Please provide a type!"],
      },
      soldeLivret: {
        type: Number,
        required: [true, "Please provide a solde!"],
      },
    },
  ],
});

// export User model with collection name and schema
module.exports = mongoose.model("Users", UserSchema, "users");
