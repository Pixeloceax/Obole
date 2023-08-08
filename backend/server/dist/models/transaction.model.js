"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    sourceAccount: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 20,
    },
    destinationAccount: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 20,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    currency: {
        type: String,
        required: true,
        trim: true,
        enum: ["USD", "EUR", "GBP", "JPY", "CAD"],
    },
    description: {
        type: String,
        default: "",
        trim: true,
        maxlength: 200,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    type: {
        type: String,
        enum: ["Deposit", "Withdrawal", "Transfer", "Credit"],
        required: true,
    },
    status: {
        type: String,
        enum: ["completed", "pending", "cancelled"],
        default: "pending",
    },
});
exports.default = mongoose_1.default.model("Transactions", transactionSchema, "transactions");
//# sourceMappingURL=transaction.model.js.map