"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    payment: {
        CompteNumber: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
});
exports.default = mongoose_1.default.model("Payment", paymentSchema, "payment");
//# sourceMappingURL=payment.model.js.map