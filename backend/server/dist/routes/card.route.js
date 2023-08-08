"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cardController_1 = require("../controllers/cardController");
const router = express_1.default.Router();
router.post("/", cardController_1.addCard);
router.get("/", cardController_1.getAllCards);
router.put("/:cardNumber", cardController_1.updateCard);
router.delete("/:cardNumber", cardController_1.deleteCard);
exports.default = router;
//# sourceMappingURL=card.route.js.map