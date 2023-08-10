"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAccountBalance = exports.updateAccountBalance = exports.getAccountBalance = void 0;
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
//# sourceMappingURL=accountBalance.utils.js.map