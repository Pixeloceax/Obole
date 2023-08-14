"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const router = express_1.default.Router();
router.post("/:destinationAccount", transactionController_1.createTransaction);
router.put("/:transactionId/cancel", transactionController_1.cancelTransaction);
router.put("/saving", transactionController_1.transferToSavingAccount);
router.put("/unsaving", transactionController_1.transferFromSavingAccount);
// router.get("/", getAllTransactions);
router.get("/", transactionController_1.getAllAccountTransactions);
exports.default = router;
//# sourceMappingURL=transaction.route.js.map