"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processRefund = exports.processPayment = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const accountBalance_utils_1 = require("../utils/accountBalance.utils");
async function validateCreditCardNumber(cardNumber) {
    try {
        const user = await user_model_1.default.findOne({
            "Card.cardNumber": cardNumber,
        });
        if (!user) {
            throw new Error(`The card number ${cardNumber} was not found.`);
        }
        return true;
    }
    catch (error) {
        throw new Error(`Error while validating credit card number: ${error.message}`);
    }
}
async function validateExpirationDate(expirationDate) {
    try {
        const user = await user_model_1.default.findOne({
            "Card.expirationDate": expirationDate,
        });
        const date = new Date();
        const currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        if (expirationDate < currentDate) {
            throw new Error(`The expiration date ${expirationDate} is not valid.`);
        }
        else if (!user) {
            throw new Error(`The expiration date ${expirationDate} was not found.`);
        }
        return true;
    }
    catch (error) {
        throw new Error(`Error while validating expiration date: ${error.message}`);
    }
}
async function validateCCV(CCV) {
    try {
        const user = await user_model_1.default.findOne({
            "Card.CCV": CCV,
        });
        if (CCV.length != 3) {
            throw new Error(`The CCV ${CCV} is not valid.`);
        }
        else if (!user) {
            throw new Error(`The CCV ${CCV} was not found.`);
        }
        return true;
    }
    catch (error) {
        throw new Error(`Error while validating CCV: ${error.message}`);
    }
}
async function validateCardHolderName(cardHolderName) {
    try {
        const user = await user_model_1.default.findOne({
            "Card.cardHolderName": cardHolderName,
        });
        if (!user) {
            throw new Error(`The card holder name ${cardHolderName} was not found.`);
        }
        return true;
    }
    catch (error) {
        throw new Error(`Error while validating card holder name: ${error.message}`);
    }
}
async function validSatus(status) {
    try {
        if (status != "locked" && status != "opposition") {
            throw new Error(`The status ${status} is not valid.`);
        }
        return true;
    }
    catch (error) {
        throw new Error(`Error while validating status: ${error.message}`);
    }
}
async function processPayment(amount, accountNumber) {
    try {
        const currentBalance = await (0, accountBalance_utils_1.getAccountBalance)(accountNumber);
        if (currentBalance === undefined) {
            throw new Error("Balance not available.");
        }
        if (currentBalance < amount) {
            throw new Error("Insufficient funds.");
        }
        const newBalance = currentBalance - amount;
        await (0, accountBalance_utils_1.updateAccountBalance)(accountNumber, newBalance);
    }
    catch (error) {
        throw new Error(`Error while processing payment: ${error.message}`);
    }
}
exports.processPayment = processPayment;
async function processRefund(transactionId, amount) { }
exports.processRefund = processRefund;
//# sourceMappingURL=paymentController.js.map