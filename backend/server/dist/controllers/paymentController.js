"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processRefund = exports.processPayment = exports.getAllAccountPayments = void 0;
const payment_model_1 = __importDefault(require("../models/payment.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const accountBalance_utils_1 = require("../utils/accountBalance.utils");
const getaccountNumber_utils_1 = require("../utils/getaccountNumber.utils");
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
        const currentDate = date.toLocaleDateString("en-US", {
            month: "2-digit",
            year: "2-digit",
        });
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
async function validateCCV(CCV, cardNumber) {
    try {
        const user = await user_model_1.default.findOne({
            "Card.cardNumber": cardNumber,
        });
        if (!user) {
            throw new Error(`The card number ${cardNumber} was not found.`);
        }
        const card = user.Card.find((card) => card.cardNumber === cardNumber);
        if (!card) {
            throw new Error(`The card number ${cardNumber} was not found.`);
        }
        if (card.CCV !== CCV) {
            throw new Error(`The CCV ${CCV} is not valid.`);
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
            "Information.name": cardHolderName,
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
async function validStatus(cardNumber) {
    try {
        const user = await user_model_1.default.findOne({
            "Card.cardNumber": cardNumber,
        });
        if (!user) {
            throw new Error(`User not found.`);
        }
        const card = user.Card[0];
        if (card.locked === true) {
            throw new Error(`The card is locked.`);
        }
        if (card.opposition === true) {
            throw new Error(`The card is opposition.`);
        }
        return true;
    }
    catch (error) {
        throw new Error(`Error while check status: ${error.message}`);
    }
}
async function getAccountNumberFromCardNumber(cardNumber) {
    try {
        const user = await user_model_1.default.findOne({
            "Card.cardNumber": cardNumber,
        });
        if (!user) {
            throw new Error(`No user found with card number ${cardNumber}`);
        }
        if (!user.Account) {
            throw new Error(`No account found for user with card number ${cardNumber}`);
        }
        const accountNumber = user.Account.accountNumber;
        return accountNumber;
    }
    catch (error) {
        throw new Error(`Error while retrieving account number: ${error.message}`);
    }
}
async function updateUsedCard(cardNumber, paymentAmount) {
    try {
        const user = await user_model_1.default.findOne({
            "Card.cardNumber": cardNumber,
        });
        if (!user) {
            throw new Error(`No user found with card number ${cardNumber}`);
        }
        const card = user.Card.find((card) => card.cardNumber === cardNumber);
        if (!card) {
            throw new Error(`No card found for user with card number ${cardNumber}`);
        }
        if (card.used === undefined) {
            card.used = 0;
        }
        if (card.limit === undefined) {
            throw new Error(`No limit found for card with card number ${cardNumber}`);
        }
        if (card.used + paymentAmount <= card.limit) {
            card.used += paymentAmount;
            await user.save();
        }
        else {
            throw new Error(`The limit is exceeded.`);
        }
    }
    catch (error) {
        throw new Error(`Error while updating used card: ${error.message}`);
    }
}
async function getAllAccountPayments(req, res) {
    try {
        const accountNumber = await (0, getaccountNumber_utils_1.getAccount)(req, res);
        const payments = await payment_model_1.default.find({
            accountNumber,
        });
        res.json(payments);
    }
    catch (error) {
        res.status(500).json({ error: `Failed to get payments: ${error.message}` });
    }
}
exports.getAllAccountPayments = getAllAccountPayments;
async function processPayment(req, res) {
    try {
        const cardNumber = req.body.cardNumber;
        const CCV = req.body.CCV;
        const expirationDate = req.body.expirationDate;
        const cardHolderName = req.body.cardHolderName;
        const paymentAmount = req.body.amount;
        const categorie = req.body.categorie;
        await validateCreditCardNumber(cardNumber);
        await validateExpirationDate(expirationDate);
        await validateCCV(CCV, cardNumber);
        await validateCardHolderName(cardHolderName);
        await validStatus(cardNumber);
        const accountNumber = await getAccountNumberFromCardNumber(cardNumber);
        if (accountNumber === undefined) {
            throw new Error("Account number is undefined");
        }
        await updateUsedCard(cardNumber, paymentAmount);
        await (0, accountBalance_utils_1.getAccountBalance)(accountNumber);
        await (0, accountBalance_utils_1.checkAccountBalance)(accountNumber, paymentAmount);
        await (0, accountBalance_utils_1.updateAccountBalance)(accountNumber, paymentAmount, "subtract");
        const payment = new payment_model_1.default({
            accountNumber,
            cardNumber,
            cardHolderName,
            amount: paymentAmount,
            categorie,
        });
        await payment.save();
        res.json(payment);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: `Failed to process payment: ${error.message}` });
    }
}
exports.processPayment = processPayment;
async function processRefund(req, res) { }
exports.processRefund = processRefund;
//# sourceMappingURL=paymentController.js.map