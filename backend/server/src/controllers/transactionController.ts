import { Request, Response } from "express";
import Transaction from "../models/transaction.model";
import {
  getAccountBalance,
  updateAccountBalance,
} from "../utils/accountBalance.utils";
import { getAccount } from "../utils/getaccountNumber.utils";

async function getStatusTransaction(transactionId: string) {
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new Error("Transaction not found.");
    }
    return transaction.status;
  } catch (error: string | any) {
    throw new Error(`Error while getting transaction status: ${error.message}`);
  }
}

async function updateTransactionStatus(
  transactionId: string,
  newStatus: string
) {
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new Error("Transaction not found.");
    }

    transaction.status = newStatus;
    await transaction.save();
  } catch (error: string | any) {
    throw new Error(
      `Error while updating transaction status: ${error.message}`
    );
  }
}

async function checkPendingTransactionStatus(transactionId: string) {
  try {
    const transactionStatus = await getStatusTransaction(transactionId);
    if (transactionStatus === "pending") {
      await updateTransactionStatus(transactionId, "completed");
    } else if (transactionStatus === "completed") {
      console.log(
        "Transaction is already completed; the status cannot be changed."
      );
    }
  } catch (error: string | any) {
    console.error(error);
  }
}

async function checkValidTransactionAccounts(
  sourceAccountFromToken: number,
  destinationAccount: number
): Promise<boolean> {
  const isDestinationAccountValid =
    sourceAccountFromToken !== destinationAccount;

  return isDestinationAccountValid;
}

let transactionTimeout: NodeJS.Timeout | null = null;

export async function createTransaction(req: Request, res: Response) {
  try {
    const { amount, currency, description, type } = req.body;

    const tokenAccountNumber = req.user?.accountNumber;
    const sourceAccount = await getAccount(req, res);
    const destinationAccount = parseInt(req.params.destinationAccount);

    if (
      !(await checkValidTransactionAccounts(sourceAccount, destinationAccount))
    ) {
      return res.status(400).json({
        error:
          "Invalid transaction accounts. Please check the source and destination accounts.",
      });
    }

    const sourceBalance = await getAccountBalance(sourceAccount);
    const destinationBalance = await getAccountBalance(destinationAccount);

    console.log("tokenAccountNumber", tokenAccountNumber);
    console.log("sourceBalance", sourceBalance);
    console.log("destinationBalance", destinationBalance);

    if (amount <= 0) {
      return res.status(400).json({
        error:
          "You cannot perform a transaction with a negative or null amount.",
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

    if (!destinationBalance) {
      return res.status(400).json({
        error: "The destination account does not exist.",
      });
    }

    if (sourceAccount != tokenAccountNumber) {
      return res.status(400).json({
        error: "You cannot perform a transaction from another account.",
      });
    }

    const newSourceBalance = sourceBalance - amount;
    const newDestinationBalance = destinationBalance + amount;

    const newTransaction = new Transaction({
      sourceAccount,
      destinationAccount,
      amount,
      currency,
      description,
      type,
    });

    const savedTransaction = await newTransaction.save();

    transactionTimeout = setTimeout(() => {
      updateAccountBalance(sourceAccount, newSourceBalance, "subtract");
      updateAccountBalance(destinationAccount, newDestinationBalance, "add");
      checkPendingTransactionStatus(savedTransaction._id.toString());
      console.log("sourceBalance", sourceBalance, newSourceBalance);
      console.log(
        "destinationBalance",
        destinationBalance,
        newDestinationBalance
      );
    }, 5 * 60 * 1000);

    res.status(201).json(savedTransaction);
  } catch (error: string | any) {
    console.error(error);
    res.status(500).json({
      error: `Failed to create transaction: ${error.message}`,
    });
  }
}

export async function cancelTransaction(req: Request, res: Response) {
  try {
    const transactionId = req.params.transactionId;
    const accountNumber = (await getAccount(req, res)).toString();
    const sourceAccount = (await getAccount(req, res)).toString();
    const currentStatus = await getStatusTransaction(transactionId);

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({
        error: "Transaction not found.",
      });
    }

    if (sourceAccount !== accountNumber) {
      return res.status(403).json({
        error: "You are not authorized to cancel this transaction.",
      });
    }

    if (currentStatus === "completed") {
      return res.status(400).json({
        error: "Cannot cancel a completed transaction.",
      });
    }

    if (currentStatus === "cancelled") {
      return res.status(400).json({
        error: "Transaction is already cancelled.",
      });
    }

    if (transactionTimeout) {
      clearTimeout(transactionTimeout);
      console.log("Transaction timeout cleared.");
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { status: "cancelled" },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        error: "Transaction not found.",
      });
    }
    res.json({ message: "Transaction cancelled successfully." });
  } catch (error: string | any) {
    res.status(500).json({
      error: `Failed to cancel transaction: ${error.message}`,
    });
  }
}

// unsafe for the moment
// export async function getAllTransactions(req: Request, res: Response) {
//   try {
//     const transactions = await Transaction.find();
//     res.json(transactions);
//   } catch (error: string | any) {
//     res.status(500).json({
//       error: `Failed to get transactions: ${error.message}`,
//     });
//   }
// }

export async function getAllAccountTransactions(req: Request, res: Response) {
  try {
    const accountNumber = (await getAccount(req, res)).toString();
    const transactions = await Transaction.find({
      $or: [
        { sourceAccount: accountNumber },
        { destinationAccount: accountNumber },
      ],
    });
    res.json(transactions);
  } catch (error: string | any) {
    res.status(500).json({
      error: `Failed to get transactions: ${error.message}`,
    });
  }
}
