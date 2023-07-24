import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
// import { sendEmail, checkEmailExist } from "../utils/email.utils";

const router = express.Router();

const DEFAULT_BALANCE = 1000;
const DEFAULT_LIMIT = 1000;
const DEFAULT_USED = 0;
const CARD_TYPES = ["A", "Jeune"];

const generateRandomPassword = () => {
  return Math.floor(Math.random() * 10000000000);
};

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

router.post("/register", async (req, res) => {
  const {
    name,
    lastName,
    email,
    phone,
    address,
    country,
    gender,
    day,
    month,
    year,
  } = req.body;

  // const emailExists = await checkEmailExist(email);
  // if (emailExists) {
  //   return res.status(400).send({
  //     message: "Email already exists",
  //   });
  // }

  let accountNumber = Math.floor(Math.random() * 1000000000000);

  // Generate a new account number until a unique one is found
  while (await User.exists({ "Account.accountNumber": accountNumber })) {
    accountNumber = Math.floor(Math.random() * 1000000000000);
  }

  const password = generateRandomPassword();
  const hashedPassword = await hashPassword(password.toString());
  const cardNumber = Math.floor(Math.random() * 10000000000000000);
  const date = new Date();
  date.setFullYear(date.getFullYear() + 5);
  const setmonth = date.getMonth() + 1;
  const setyear = date.getFullYear().toString().slice(-2);
  const expirationDate = `${setmonth.toString().padStart(2, "0")}/${setyear}`;
  const code = Math.floor(Math.random() * 10000);
  const CCV = Math.floor(Math.random() * 1000);
  const type = CARD_TYPES[Math.floor(Math.random() * CARD_TYPES.length)];
  const savingsBalance = DEFAULT_BALANCE;
  let typeOfCard = "newAccount";

  const user = new User({
    Information: {
      name,
      lastName,
      phone,
      email,
      gender,
      address,
      country,
      date_of_birth: {
        day,
        month,
        year,
      },
    },
    Account: {
      accountNumber,
      hashPassword: hashedPassword,
    },
    Card: [
      {
        cardNumber,
        expirationDate,
        code,
        CCV,
        locked: false,
        opposition: false,
        limit: DEFAULT_LIMIT,
        used: DEFAULT_USED,
      },
    ],
    Balance: {
      balance: DEFAULT_BALANCE,
    },
    SavingsAccount: [
      {
        type,
        savingsBalance,
      },
    ],
  });

  // sendEmail(
  //   email,
  //   password,
  //   accountNumber,
  //   cardNumber,
  //   code,
  //   CCV,
  //   expirationDate,
  //   typeOfCard
  // );

  console.log("accountNumber", accountNumber, "password", password);

  try {
    const result = await user.save();
    res.status(201).send({
      message: "User Created Successfully",
      result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating user",
      error,
    });
  }
});

export default router;
