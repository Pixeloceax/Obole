import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

import User from "../models/user.model";

router.use(express.json());

router.post("/login", async (req, res) => {
  try {
    const accountNumber = req.body.accountNumber;
    if (!accountNumber) {
      return res.status(400).json({ message: "Account number is required" });
    }

    const user = await User.findOne({ "Account.accountNumber": accountNumber });
    if (!user || !user.Account) {
      return res.status(401).json({ message: "Invalid account" });
    }

    const password = req.body.password;
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashPassword = user.Account.hashPassword;
    if (!hashPassword) {
      return res.status(500).json({ message: "Server error" });
    }

    const isMatch = await bcrypt.compare(password, hashPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const secretKey = process.env.SECRET_KEY || "SECRET_KEY";
    if (!secretKey) {
      return res.status(500).json({ message: "Server error" });
    }

    const token = jwt.sign(
      {
        accountNumber: user.Account.accountNumber,
      },
      secretKey,
      { expiresIn: "300s" }
    );

    res.status(200).send({
      message: "Login successful",
      token: token,
    });
  } catch (err) {
    res.status(404).json({ message: "Account not found" });
  }
});

export default router;
