"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAccountTransactions = exports.cancelTransaction = exports.createTransaction = void 0;
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const accountBalance_utils_1 = require("../utils/accountBalance.utils");
const getaccountNumber_utils_1 = require("../utils/getaccountNumber.utils");
async function getStatusTransaction(transactionId) {
    try {
        const transaction = await transaction_model_1.default.findById(transactionId);
        if (!transaction) {
            throw new Error("Transaction not found.");
        }
        return transaction.status;
    }
    catch (error) {
        throw new Error(`Error while getting transaction status: ${error.message}`);
    }
}
async function updateTransactionStatus(transactionId, newStatus) {
    try {
        const transaction = await transaction_model_1.default.findById(transactionId);
        if (!transaction) {
            throw new Error("Transaction not found.");
        }
        transaction.status = newStatus;
        await transaction.save();
    }
    catch (error) {
        throw new Error(`Error while updating transaction status: ${error.message}`);
    }
}
async function checkPendingTransactionStatus(transactionId) {
    try {
        const transactionStatus = await getStatusTransaction(transactionId);
        if (transactionStatus === "pending") {
            await updateTransactionStatus(transactionId, "completed");
        }
        else if (transactionStatus === "completed") {
            console.log("Transaction is already completed; the status cannot be changed.");
        }
    }
    catch (error) {
        console.error(error);
    }
}
async function checkValidTransactionAccounts(sourceAccountFromToken, destinationAccount) {
    const isDestinationAccountValid = sourceAccountFromToken !== destinationAccount;
    return isDestinationAccountValid;
}
let transactionTimeout = null;
async function createTransaction(req, res) {
    var _a;
    try {
        const { amount, currency, description, type } = req.body;
        const tokenAccountNumber = (_a = req.user) === null || _a === void 0 ? void 0 : _a.accountNumber;
        const sourceAccount = await (0, getaccountNumber_utils_1.getAccount)(req, res);
        const destinationAccount = parseInt(req.params.destinationAccount);
        if (!(await checkValidTransactionAccounts(sourceAccount, destinationAccount))) {
            return res.status(400).json({
                error: "Invalid transaction accounts. Please check the source and destination accounts.",
            });
        }
        const sourceBalance = await (0, accountBalance_utils_1.getAccountBalance)(sourceAccount);
        const destinationBalance = await (0, accountBalance_utils_1.getAccountBalance)(destinationAccount);
        console.log("tokenAccountNumber", tokenAccountNumber);
        console.log("sourceBalance", sourceBalance);
        console.log("destinationBalance", destinationBalance);
        if (amount <= 0) {
            return res.status(400).json({
                error: "You cannot perform a transaction with a negative or null amount.",
            });
        }
        if (!sourceBalance || sourceBalance < amount) {
            return res.status(400).json({
                error: "The source account does not have enough balance.",
            });
        }
        if (sourceAccount === destinationAccount) {
            return res.status(400).json({
                error: "You cannot perform a transaction from an account to the same account.",
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
        const newTransaction = new transaction_model_1.default({
            sourceAccount,
            destinationAccount,
            amount,
            currency,
            description,
            type,
        });
        const savedTransaction = await newTransaction.save();
        transactionTimeout = setTimeout(() => {
            (0, accountBalance_utils_1.updateAccountBalance)(sourceAccount, newSourceBalance, "subtract");
            (0, accountBalance_utils_1.updateAccountBalance)(destinationAccount, newDestinationBalance, "add");
            checkPendingTransactionStatus(savedTransaction._id.toString());
            console.log("sourceBalance", sourceBalance, newSourceBalance);
            console.log("destinationBalance", destinationBalance, newDestinationBalance);
        }, 5 * 60 * 1000);
        res.status(201).json(savedTransaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: `Failed to create transaction: ${error.message}`,
        });
    }
}
exports.createTransaction = createTransaction;
async function cancelTransaction(req, res) {
    try {
        const transactionId = req.params.transactionId;
        const accountNumber = (await (0, getaccountNumber_utils_1.getAccount)(req, res)).toString();
        const sourceAccount = (await (0, getaccountNumber_utils_1.getAccount)(req, res)).toString();
        const currentStatus = await getStatusTransaction(transactionId);
        const transaction = await transaction_model_1.default.findById(transactionId);
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
        const updatedTransaction = await transaction_model_1.default.findByIdAndUpdate(transactionId, { status: "cancelled" }, { new: true });
        if (!updatedTransaction) {
            return res.status(404).json({
                error: "Transaction not found.",
            });
        }
        res.json({ message: "Transaction cancelled successfully." });
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to cancel transaction: ${error.message}`,
        });
    }
}
exports.cancelTransaction = cancelTransaction;
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
async function getAllAccountTransactions(req, res) {
    try {
        const accountNumber = (await (0, getaccountNumber_utils_1.getAccount)(req, res)).toString();
        const transactions = await transaction_model_1.default.find({
            $or: [
                { sourceAccount: accountNumber },
                { destinationAccount: accountNumber },
            ],
        });
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to get transactions: ${error.message}`,
        });
    }
}
exports.getAllAccountTransactions = getAllAccountTransactions;
//# sourceMappingURL=transactionController.js.map