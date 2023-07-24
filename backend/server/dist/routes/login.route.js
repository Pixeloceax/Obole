"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const user_model_1 = __importDefault(require("../models/user.model"));
router.use(express_1.default.json());
router.post("/login", async (req, res) => {
    try {
        const accountNumber = req.body.accountNumber;
        if (!accountNumber) {
            return res.status(400).json({ message: "Account number is required" });
        }
        const user = await user_model_1.default.findOne({ "Account.accountNumber": accountNumber });
        if (!user || !user.Account) {
            return res.status(401).json({ message: "Invalid account" });
        }
        const password = req.body.password;
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        const hashPassword = user.Account.hashPassword;
        if (!hashPassword) {
            return res.status(500).json({ message: "Server error" });
        }
        // Compare the password with the stored hashed password
        const isMatch = await bcrypt_1.default.compare(password, hashPassword);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const secretKey = process.env.SECRET_KEY || "SECRET_KEY";
        if (!secretKey) {
            return res.status(500).json({ message: "Server error" });
        }
        const token = jsonwebtoken_1.default.sign({
            accountNumber: user.Account.accountNumber,
        }, secretKey, { expiresIn: "300s" });
        res.status(200).send({
            message: "Login successful",
            token: token,
        });
    }
    catch (err) {
        res.status(404).json({ message: "Account not found" });
    }
});
exports.default = router;
//# sourceMappingURL=login.route.js.map