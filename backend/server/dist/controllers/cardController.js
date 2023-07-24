"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = exports.updateCard = exports.getAllCards = exports.addCard = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
async function addCard(req, res) {
    try {
        const accountNumber = req.params.accountNumber;
        const user = await user_model_1.default.findOne({ "Account.accountNumber": accountNumber });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        const cardNumber = Math.floor(Math.random() * 10000000000000000);
        const date = new Date();
        date.setFullYear(date.getFullYear() + 5);
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(-2);
        const expirationDate = `${month.toString().padStart(2, "0")}/${year}`;
        const code = Math.floor(Math.random() * 10000);
        const CCV = Math.floor(Math.random() * 1000);
        const limit = 5000;
        const used = 0;
        const cardData = {
            cardNumber,
            expirationDate,
            code,
            CCV,
            locked: false,
            opposition: false,
            limit,
            used,
        };
        user.Card.push(cardData);
        await user.save();
        res.status(201).json({ message: "Card added successfully." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add card to the user." });
    }
}
exports.addCard = addCard;
async function getAllCards(req, res) {
    try {
        const accountNumber = req.params.accountNumber;
        const user = await user_model_1.default.findOne({ "Account.accountNumber": accountNumber });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        const cards = user.Card;
        res.json(cards);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get cards for the user." });
    }
}
exports.getAllCards = getAllCards;
async function updateCard(req, res) {
    try {
        const accountNumber = req.params.accountNumber;
        const cardNumber = req.params.cardNumber;
        const { locked, opposition, limit } = req.body;
        const user = await user_model_1.default.findOne({ "Account.accountNumber": accountNumber });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        const cardIndex = user.Card.findIndex((card) => card.cardNumber === Number(cardNumber));
        if (cardIndex === -1) {
            return res.status(404).json({ error: "Card not found for the user." });
        }
        if (locked !== undefined) {
            user.Card[cardIndex].locked = locked;
        }
        if (opposition !== undefined) {
            user.Card[cardIndex].opposition = opposition;
        }
        if (limit !== undefined) {
            user.Card[cardIndex].limit = limit;
        }
        await user.save();
        res.json({ message: "Card updated successfully." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update the card for the user." });
    }
}
exports.updateCard = updateCard;
async function deleteCard(req, res) {
    try {
        const accountNumber = req.params.accountNumber;
        const cardNumber = req.params.cardNumber;
        const user = await user_model_1.default.findOne({ "Account.accountNumber": accountNumber });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        const cardIndex = user.Card.findIndex((card) => card.cardNumber === Number(cardNumber));
        if (cardIndex === -1) {
            return res.status(404).json({ error: "Card not found for the user." });
        }
        user.Card.splice(cardIndex, 1);
        await user.save();
        res.json({ message: "Card deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete the card for the user." });
    }
}
exports.deleteCard = deleteCard;
//# sourceMappingURL=cardController.js.map