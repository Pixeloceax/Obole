"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSavingAccountBalance = exports.updateSavingAccountBalance = exports.getSavingAccountBalance = exports.checkAccountBalance = exports.updateAccountBalance = exports.getAccountBalance = void 0;
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
async function updateAccountBalance(accountNumber, amount, operation) {
    try {
        const updateQuery = {};
        if (operation === "add") {
            updateQuery.$inc = { "Balance.balance": amount };
        }
        else if (operation === "subtract") {
            updateQuery.$inc = { "Balance.balance": -amount };
        }
        else {
            throw new Error("Invalid operation.");
        }
        const user = await user_model_1.default.findOneAndUpdate({ "Account.accountNumber": accountNumber }, updateQuery, { new: true, useFindAndModify: false });
        if (!user) {
            throw new Error("Account not found.");
        }
    }
    catch (error) {
        throw new Error(`Error while updating account balance: ${error.message}`);
    }
}
exports.updateAccountBalance = updateAccountBalance;
async function checkAccountBalance(accountNumber, amount) {
    try {
        const currentBalance = await getAccountBalance(accountNumber);
        if (currentBalance === undefined) {
            throw new Error("Balance not available.");
        }
        if (currentBalance < amount) {
            throw new Error("Insufficient funds.");
        }
        return currentBalance >= amount;
    }
    catch (error) {
        throw new Error(`Error while checking account balance: ${error.message}`);
    }
}
exports.checkAccountBalance = checkAccountBalance;
async function getSavingAccountBalance(SavingAccountNumber) {
    try {
        const user = await user_model_1.default.findOne({
            "SavingsAccount.savingAccountNumber": SavingAccountNumber,
        });
        if (!user) {
            throw new Error("SavingsAccount not found.");
        }
        const account = user.SavingsAccount.find((account) => account.savingAccountNumber === SavingAccountNumber);
        if (!account) {
            throw new Error("SavingsAccount not found.");
        }
        return account.savingsBalance;
    }
    catch (error) {
        throw new Error(`Error while getting account balance: ${error.message}`);
    }
}
exports.getSavingAccountBalance = getSavingAccountBalance;
async function updateSavingAccountBalance(SavingAccountNumber, amount, operation) {
    try {
        const updateQuery = {};
        if (operation === "add") {
            updateQuery.$inc = { "SavingsAccount.$[account].savingsBalance": amount };
        }
        else if (operation === "subtract") {
            updateQuery.$inc = {
                "SavingsAccount.$[account].savingsBalance": -amount,
            };
        }
        else {
            throw new Error("Invalid operation.");
        }
        const options = {
            arrayFilters: [{ "account.savingAccountNumber": SavingAccountNumber }],
            new: true,
            useFindAndModify: false,
        };
        const user = await user_model_1.default.findOneAndUpdate({ "SavingsAccount.savingAccountNumber": SavingAccountNumber }, updateQuery, options);
        if (!user) {
            throw new Error("Account not found.");
        }
    }
    catch (error) {
        throw new Error(`Error while updating account balance: ${error.message}`);
    }
}
exports.updateSavingAccountBalance = updateSavingAccountBalance;
async function checkSavingAccountBalance(SavingAccountNumber, amount) {
    try {
        const currentBalance = await getSavingAccountBalance(SavingAccountNumber);
        if (currentBalance === undefined) {
            throw new Error("Balance not available.");
        }
        if (currentBalance < amount) {
            throw new Error("Insufficient funds.");
        }
        return true;
    }
    catch (error) {
        throw new Error(`Error while checking account balance: ${error.message}`);
    }
}
exports.checkSavingAccountBalance = checkSavingAccountBalance;
//# sourceMappingURL=accountBalance.utils.js.map