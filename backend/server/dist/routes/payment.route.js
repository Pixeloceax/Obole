"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const paymentController_1 = require("../controllers/paymentController");
const router = express_1.default.Router();
router.post("/", paymentController_1.processPayment);
router.get("/", auth_1.authenticateToken, paymentController_1.getAllAccountPayments);
exports.default = router;
//# sourceMappingURL=payment.route.js.map