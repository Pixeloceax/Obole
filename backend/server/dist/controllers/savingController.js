"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaving = exports.openSaving = void 0;
const getaccountNumber_utils_1 = require("../utils/getaccountNumber.utils");
const user_model_1 = __importDefault(require("../models/user.model"));
const openSaving = async (req, res) => {
    const accountNumber = await (0, getaccountNumber_utils_1.getAccount)(req, res);
    const user = await user_model_1.default.findOne({ "Account.accountNumber": accountNumber });
    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }
    const savingAccountNumber = Math.floor(Math.random() * 1000000000000);
    const type = req.body.type;
    const savingsBalance = 0;
    const interestRate = 1;
    try {
        const existingAccount = user.SavingsAccount.find((acc) => acc.type === type);
        if (existingAccount) {
            return res
                .status(400)
                .json({ error: "Savings account with the same type already exists." });
        }
        const newAccount = {
            savingAccountNumber,
            type,
            savingsBalance,
            interestRate,
        };
        user.SavingsAccount.push(newAccount);
        await user.save();
        res.status(201).json(user.SavingsAccount);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.openSaving = openSaving;
const getSaving = async (req, res) => {
    const accountNumber = await (0, getaccountNumber_utils_1.getAccount)(req, res);
    const user = await user_model_1.default.findOne({ "Account.accountNumber": accountNumber });
    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }
    try {
        res.status(200).json(user.SavingsAccount);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getSaving = getSaving;
const updatePrevisional = async (req, res) => {
    setTimeout(async () => {
        const accountNumber = await (0, getaccountNumber_utils_1.getAccount)(req, res);
        const user = await user_model_1.default.findOne({ "Account.accountNumber": accountNumber });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        try {
            user.SavingsAccount.forEach((account) => {
                if (account.interestRate) {
                    account.interestRate =
                        account.interestRate * (1 + account.interestRate);
                }
            });
            user.SavingsAccount.forEach((account) => {
                if (account.savingsBalance && account.interestRate) {
                    account.savingsBalance =
                        account.savingsBalance * (1 + account.interestRate);
                }
            });
            await user.save();
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }, 30000);
    console.log("Previsional updated");
};
//# sourceMappingURL=savingController.js.map