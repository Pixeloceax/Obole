"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.updateAccountBalance = exports.getAccountBalance = void 0;
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
async function getAccountBalance(accountNumber) {
    var _a;
    try {
        const user = await user_model_1.default.findOne({
            "Account.accountNumber": accountNumber,
        });
        if (!user) {
            throw new Error("Account not found.");
        }
        return (_a = user.Balance) === null || _a === void 0 ? void 0 : _a.balance;
    }
    catch (error) {
        throw new Error(`Error while getting account balance: ${error.message}`);
    }
}
exports.getAccountBalance = getAccountBalance;
async function updateAccountBalance(accountNumber, newBalance) {
    try {
        const user = await user_model_1.default.findOneAndUpdate({ "Account.accountNumber": accountNumber }, { $set: { "Balance.balance": newBalance } }, { new: true, useFindAndModify: false });
        if (!user) {
            throw new Error("Account not found.");
        }
    }
    catch (error) {
        throw new Error(`Error while updating account balance: ${error.message}`);
    }
}
exports.updateAccountBalance = updateAccountBalance;
async function createTransaction(req, res) {
    try {
        const { amount, currency, description, type } = req.body;
        const sourceAccount = req.params.sourceAccount;
        const destinationAccount = req.params.destinationAccount;
        const sourceBalance = await getAccountBalance(sourceAccount);
        const destinationBalance = await getAccountBalance(destinationAccount);
        if (amount <= 0) {
            return res.status(400).json({
                error: "you cannot perform a transaction with a negative or null amount.",
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
        const newSourceBalance = sourceBalance - amount;
        const newDestinationBalance = destinationBalance + amount;
        await updateAccountBalance(sourceAccount, newSourceBalance);
        await updateAccountBalance(destinationAccount, newDestinationBalance);
        const newTransaction = new transaction_model_1.default({
            sourceAccount,
            destinationAccount,
            amount,
            currency,
            description,
            type,
        });
        const savedTransaction = await newTransaction.save();
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
//# sourceMappingURL=transactionController.js.map