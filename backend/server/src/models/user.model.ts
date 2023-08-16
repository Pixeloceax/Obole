import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Information: {
    name: {
      type: String,
      required: [true, "Please provide a name!"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name!"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number!"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email!"],
      unique: [true, "Email already exists"],
    },
    gender: {
      type: String,
      required: [true, "Please provide a gender!"],
    },
    address: {
      type: String,
      required: [true, "Please provide an address!"],
    },
    country: {
      type: String,
      required: [true, "Please provide a country!"],
    },
    date_of_birth: {
      day: {
        type: Number,
        required: [true, "Please provide a day!"],
      },
      month: {
        type: Number,
        required: [true, "Please provide a month!"],
      },
      year: {
        type: Number,
        required: [true, "Please provide a year!"],
      },
    },
  },
  Account: {
    accountNumber: {
      type: Number,
      required: [true, "Please provide an account number!"],
      unique: [true, "Account number already exists"],
    },
    hashPassword: {
      type: String,
      required: [true, "Please provide a password hash!"],
    },
  },
  Card: [
    {
      cardNumber: {
        type: Number,
        required: [true, "Please provide a card number!"],
      },
      expirationDate: {
        type: String,
        required: [true, "Please provide an expiration date!"],
      },
      code: {
        type: Number,
        required: [true, "Please provide a code!"],
      },
      CCV: {
        type: Number,
        required: [true, "Please provide a CCV!"],
      },
      locked: {
        type: Boolean,
        default: false,
      },
      opposition: {
        type: Boolean,
        default: false,
      },
      limit: {
        type: Number,
        required: [true, "Please provide a limit!"],
      },
      used: {
        type: Number,
        required: [true, "Please provide a used amount!"],
      },
    },
  ],
  Balance: {
    balance: {
      type: Number,
      required: [true, "Please provide a balance!"],
    },
  },
  SavingsAccount: [
    {
      savingAccountNumber: {
        type: Number,
        required: [true, "Please provide a saving account number!"],
      },
      type: {
        type: String,
        required: [true, "Please provide a type!"],
        enum: ["A", "jeune"],
      },
      savingsBalance: {
        type: Number,
        required: [true, "Please provide a balance!"],
      },
      interestRate: {
        type: Number,
        required: [true, "Please provide an interest rate!"],
      },
    },
  ],
});

export default mongoose.model("Users", userSchema, "users");
