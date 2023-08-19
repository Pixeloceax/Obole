import { Request, Response } from "express";
import Transaction from "../models/transaction.model";
import Payment from "../models/payment.model";

import { getAccount } from "../utils/getaccountNumber.utils";

async function formattedDate(inputDate: Date): Promise<string> {
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
}

export async function getAllAccountTransactions(req: Request, res: Response) {
  try {
    const accountNumber = await getAccount(req, res);
    const transactions = await Transaction.find({
      $or: [
        { sourceAccount: accountNumber },
        { destinationAccount: accountNumber },
      ],
    });
    return transactions;
  } catch (error: string | any) {
    res.status(500).json({
      error: `Failed to get transactions: ${error.message}`,
    });
  }
}

export async function getAllAccountPayments(req: Request, res: Response) {
  try {
    const accountNumber = await getAccount(req, res);
    const payments = await Payment.find({
      accountNumber,
    });
    return payments;
  } catch (error: any) {
    res.status(500).json({ error: `Failed to get payments: ${error.message}` });
  }
}

export async function formattedTransactions(req: Request, res: Response) {
  const transactionsData = await getAllAccountTransactions(req, res);
  if (!transactionsData) {
    throw new Error("Failed to get transactions");
  }

  const completedTransactions = await Promise.all(
    transactionsData
      .filter((transaction) => transaction.status === "completed")
      .map(async (transaction) => {
        return {
          amount: transaction.amount,
          currency: transaction.currency,
          description: transaction.description,
          type: transaction.type,
          date: await formattedDate(transaction.date),
        };
      })
  );

  return completedTransactions;
}

export async function formattedPayments(req: Request, res: Response) {
  const paymentsData = await getAllAccountPayments(req, res);
  if (!paymentsData) {
    throw new Error("Failed to get payments");
  }

  const payments = await Promise.all(
    paymentsData.map(async (payment) => {
      return {
        amount: payment.amount,
        categorie: payment.categorie,
        date: await formattedDate(payment.date),
      };
    })
  );

  return payments;
}

export async function getPaymentAndTransactionDataForStats(
  req: Request,
  res: Response
) {
  try {
    const transactions = await formattedTransactions(req, res);
    const payments = await formattedPayments(req, res);
    res.json({
      transactions,
      payments,
    });
  } catch (error: any) {
    res.status(500).json({
      error: `Failed to get statistics data: ${error.message}`,
    });
  }
}
