"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentAndTransactionDataForStats = void 0;
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const payment_model_1 = __importDefault(require("../models/payment.model"));
const getaccountNumber_utils_1 = require("../utils/getaccountNumber.utils");
async function formattedDate(inputDate) {
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
}
async function getAllAccountTransactions(req, res) {
    try {
        const accountNumber = await (0, getaccountNumber_utils_1.getAccount)(req, res);
        const transactions = await transaction_model_1.default.find({
            $or: [
                { sourceAccount: accountNumber },
                { destinationAccount: accountNumber },
            ],
        });
        return transactions;
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to get transactions: ${error.message}`,
        });
    }
}
async function getAllAccountPayments(req, res) {
    try {
        const accountNumber = await (0, getaccountNumber_utils_1.getAccount)(req, res);
        const payments = await payment_model_1.default.find({
            accountNumber,
        });
        return payments;
    }
    catch (error) {
        res.status(500).json({ error: `Failed to get payments: ${error.message}` });
    }
}
async function formattedTransactions(req, res) {
    const transactionsData = await getAllAccountTransactions(req, res);
    if (!transactionsData) {
        throw new Error("Failed to get transactions");
    }
    const completedTransactions = await Promise.all(transactionsData
        .filter((transaction) => transaction.status === "completed")
        .map(async (transaction) => {
        return {
            amount: transaction.amount,
            currency: transaction.currency,
            description: transaction.description,
            type: transaction.type,
            date: await formattedDate(transaction.date),
        };
    }));
    return completedTransactions;
}
async function formattedPayments(req, res) {
    const paymentsData = await getAllAccountPayments(req, res);
    if (!paymentsData) {
        throw new Error("Failed to get payments");
    }
    const payments = await Promise.all(paymentsData.map(async (payment) => {
        return {
            amount: payment.amount,
            categorie: payment.categorie,
            date: await formattedDate(payment.date),
        };
    }));
    return payments;
}
async function getPaymentAndTransactionDataForStats(req, res) {
    try {
        const transactions = await formattedTransactions(req, res);
        const payments = await formattedPayments(req, res);
        res.json({
            transactions,
            payments,
        });
    }
    catch (error) {
        res.status(500).json({
            error: `Failed to get statistics data: ${error.message}`,
        });
    }
}
exports.getPaymentAndTransactionDataForStats = getPaymentAndTransactionDataForStats;
//# sourceMappingURL=statsController.js.map