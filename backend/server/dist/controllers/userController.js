"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
async function getUserInfo(req, res) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No access token provided." });
    }
    try {
        const secretKey = process.env.SECRET_KEY || "SECRET_KEY";
        if (!secretKey) {
            return res.status(500).json({ error: "Server error" });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        const accountNumber = decodedToken.accountNumber;
        const userInfo = await user_model_1.default.findOne({
            "Account.accountNumber": accountNumber,
        });
        if (!userInfo) {
            return res.status(404).json({ error: "User not found." });
        }
        return res.json(userInfo);
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(403).json({ error: "Invalid access token." });
        }
        else {
            return res.status(500).json({ error: "Server error" });
        }
    }
}
exports.getUserInfo = getUserInfo;
//# sourceMappingURL=userController.js.map