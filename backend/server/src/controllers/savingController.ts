import { Request, Response } from "express";
import { getAccount } from "../utils/getaccountNumber.utils";
import User from "../models/user.model";

export const openSaving = async (req: Request, res: Response) => {
  const accountNumber = await getAccount(req, res);
  const user = await User.findOne({ "Account.accountNumber": accountNumber });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  const savingAccountNumber = Math.floor(Math.random() * 1000000000000);
  const type = req.body.type;
  const savingsBalance = 0;
  const interestRate = 1;

  try {
    const existingAccount = user.SavingsAccount.find(
      (acc) => acc.type === type
    );
    if (existingAccount) {
      return res
        .status(400)
        .json({ error: "Savings account with the same type already exists." });
    }
    const newAccount = {
      savingAccountNumber,
      type,
      savingsBalance,
      interestRate,
    };
    user.SavingsAccount.push(newAccount);
    await user.save();
    res.status(201).json(user.SavingsAccount);
  } catch (error: string | any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSaving = async (req: Request, res: Response) => {
  const accountNumber = await getAccount(req, res);
  const user = await User.findOne({ "Account.accountNumber": accountNumber });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  try {
    res.status(200).json(user.SavingsAccount);
  } catch (error: string | any) {
    res.status(500).json({ error: error.message });
  }
};

const updatePrevisional = async (req: Request, res: Response) => {
  setTimeout(async () => {
    const accountNumber = await getAccount(req, res);
    const user = await User.findOne({ "Account.accountNumber": accountNumber });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    try {
      user.SavingsAccount.forEach((account) => {
        if (account.interestRate) {
          account.interestRate =
            account.interestRate * (1 + account.interestRate);
        }
      });

      user.SavingsAccount.forEach((account) => {
        if (account.savingsBalance && account.interestRate) {
          account.savingsBalance =
            account.savingsBalance * (1 + account.interestRate);
        }
      });

      await user.save();
      res.status(200).json(user);
    } catch (error: string | any) {
      res.status(500).json({ error: error.message });
    }
  }, 30000);
};
