import { Request, Response } from "express";
import Transaction from "../models/transaction.model";
import UserModel from "../models/user.model";

async function getAccountBalance(accountNumber: string) {
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

async function updateAccountBalance(accountNumber: string, newBalance: number) {
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
  sourceAccountFromToken: string,
  destinationAccount: string
): Promise<boolean> {
  const isDestinationAccountValid =
    sourceAccountFromToken !== destinationAccount;

  return isDestinationAccountValid;
}

export async function createTransaction(req: Request, res: Response) {
  try {
    const { amount, currency, description, type } = req.body;

    const tokenAccountNumber = req.user?.accountNumber;
    const sourceAccount = req.params.sourceAccount;
    const destinationAccount = req.params.destinationAccount;

    if (!checkValidTransactionAccounts(sourceAccount, destinationAccount)) {
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

    setTimeout(() => {
      checkPendingTransactionStatus(savedTransaction._id.toString());
    }, 5 * 60 * 1000);

    res.status(201).json(savedTransaction);
  } catch (error: string | any) {
    console.error(error);
    res.status(500).json({
      error: `Failed to create transaction: ${error.message}`,
    });
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function cancelTransaction(req: Request, res: Response) {
  try {
    const transactionId = req.params.transactionId;

    const currentStatus = await getStatusTransaction(transactionId);

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
    const accountNumber = req.params.accountNumber;
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
