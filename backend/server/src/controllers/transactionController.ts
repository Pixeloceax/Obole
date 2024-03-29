import { Request, Response } from "express";
import Transaction from "../models/transaction.model";
import User from "../models/user.model";
import {
  getAccountBalance,
  updateAccountBalance,
  getSavingAccountBalance,
  updateSavingAccountBalance,
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
  newStatus: "pending" | "completed" | "cancelled"
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
      throw new Error("Transaction already completed.");
    }
  } catch (error: string | any) {
    throw new Error(
      `Error while checking pending transaction status: ${error.message}`
    );
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
      updateAccountBalance(sourceAccount, amount, "subtract");
      updateAccountBalance(destinationAccount, amount, "add");
      checkPendingTransactionStatus(savedTransaction._id.toString());
    }, 30 * 1000);

    res.status(201).json(savedTransaction);
  } catch (error: string | any) {
    res.status(500).json({
      error: `Failed to create transaction: ${error.message}`,
    });
  }
}

export async function cancelTransaction(req: Request, res: Response) {
  try {
    const transactionId = req.params.transactionId;
    const accountNumber = await getAccount(req, res);
    const sourceAccount = await getAccount(req, res);
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

export async function transferToSavingAccount(req: Request, res: Response) {
  try {
    const { amount, destinationAccountType } = req.body;

    const sourceAccount = await getAccount(req, res);

    const user = await User.findOne({ "Account.accountNumber": sourceAccount });
    const destinationAccount = user?.SavingsAccount.find(
      (account) => account.type === destinationAccountType
    )?.savingAccountNumber;

    if (!destinationAccount) {
      return res.status(400).json({
        error: "The destination account does not exist.",
      });
    }

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    const sourceBalance = await getAccountBalance(sourceAccount);
    const destinationBalance = await getSavingAccountBalance(
      destinationAccount
    );

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

    const newTransaction = new Transaction({
      sourceAccount,
      destinationAccount: destinationAccount,
      amount,
      currency: "EUR",
      description: "Transfer to savings account",
      type: "Transfer",
    });

    const savedTransaction = await newTransaction.save();

    transactionTimeout = setTimeout(() => {
      updateAccountBalance(sourceAccount, amount, "subtract");
      updateSavingAccountBalance(destinationAccount, amount, "add");
      checkPendingTransactionStatus(savedTransaction._id.toString());
    }, 30 * 1000);

    await user.save();
    res.status(201).json(savedTransaction);
  } catch (error: string | any) {
    res.status(500).json({
      error: `Failed to perform transfer: ${error.message}`,
    });
  }
}

export async function transferFromSavingAccount(req: Request, res: Response) {
  try {
    const { amount, sourceAccountType } = req.body;

    const destinationAccount = await getAccount(req, res);

    const user = await User.findOne({
      "Account.accountNumber": destinationAccount,
    });
    const sourceAccount = user?.SavingsAccount.find(
      (account) => account.type === sourceAccountType
    )?.savingAccountNumber;

    if (!sourceAccount) {
      return res.status(400).json({
        error: "The source account does not exist.",
      });
    }

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    const destinationBalance = await getAccountBalance(destinationAccount);
    const sourceBalance = await getSavingAccountBalance(sourceAccount);

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

    const newTransaction = new Transaction({
      sourceAccount: sourceAccount,
      destinationAccount,
      amount,
      currency: "EUR",
      description: "Transfer from savings account",
      type: "Transfer",
    });

    const savedTransaction = await newTransaction.save();

    transactionTimeout = setTimeout(() => {
      updateSavingAccountBalance(sourceAccount, amount, "subtract");
      updateAccountBalance(destinationAccount, amount, "add");
      checkPendingTransactionStatus(savedTransaction._id.toString());
    }, 30 * 1000);

    await user.save();
    res.status(201).json(savedTransaction);
  } catch (error: string | any) {
    res.status(500).json({
      error: `Failed to perform transfer: ${error.message}`,
    });
  }
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
    res.json(transactions);
  } catch (error: string | any) {
    res.status(500).json({
      error: `Failed to get transactions: ${error.message}`,
    });
  }
}
