"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccount = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function getAccount(req, res) {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            throw new Error("No access token provided.");
        }
        const secretKey = process.env.SECRET_KEY || "SECRET_KEY";
        if (!secretKey) {
            throw new Error("Secret key not found.");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        const accountNumber = decodedToken.accountNumber;
        return accountNumber;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new Error("Invalid access token.");
        }
        else {
            throw error;
        }
    }
}
exports.getAccount = getAccount;
//# sourceMappingURL=getaccountNumber.utils.js.map