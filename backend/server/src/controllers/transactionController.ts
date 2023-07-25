import { Request, Response } from "express";
import Transaction from "../models/transaction.model";
import UserModel from "../models/user.model";

export async function getAccountBalance(accountNumber: string) {
  try {
    const user = await UserModel.findOne({
      "Account.accountNumber": accountNumber,
    });
    if (!user) {
      throw new Error("Account not found.");
    }
    return user.Balance?.balance;
  } catch (error: string | any) {
    throw new Error(`Error while getting account balance: ${error.message}`);
  }
}

export async function updateAccountBalance(
  accountNumber: string,
  newBalance: number
) {
  try {
    const user = await UserModel.findOneAndUpdate(
      { "Account.accountNumber": accountNumber },
      { $set: { "Balance.balance": newBalance } },
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      throw new Error("Account not found.");
    }
  } catch (error: string | any) {
    throw new Error(`Error while updating account balance: ${error.message}`);
  }
}

export async function createTransaction(req: Request, res: Response) {
  try {
    const { amount, currency, description, type } = req.body;

    const sourceAccount = req.params.sourceAccount;
    const destinationAccount = req.params.destinationAccount;

    const sourceBalance = await getAccountBalance(sourceAccount);
    const destinationBalance = await getAccountBalance(destinationAccount);

    if (amount <= 0) {
      return res.status(400).json({
        error:
          "you cannot perform a transaction with a negative or null amount.",
      });
    }

    if (!sourceBalance || sourceBalance < amount) {
      return res.status(400).json({
        error: "The source account does not have enough balance.",
      });
    }

    if (sourceAccount === destinationAccount) {
      return res.status(400).json({
        error:
          "You cannot perform a transaction from an account to the same account.",
      });
    }

    const newSourceBalance = sourceBalance - amount;
    const newDestinationBalance = destinationBalance + amount;

    await updateAccountBalance(sourceAccount, newSourceBalance);
    await updateAccountBalance(destinationAccount, newDestinationBalance);

    const newTransaction = new Transaction({
      sourceAccount,
      destinationAccount,
      amount,
      currency,
      description,
      type,
    });

    const savedTransaction = await newTransaction.save();

    res.status(201).json(savedTransaction);
  } catch (error: string | any) {
    console.error(error);
    res.status(500).json({
      error: `Failed to create transaction: ${error.message}`,
    });
  }
}
