import express from "express";
import {
  addCard,
  getAllCards,
  updateCard,
  deleteCard,
} from "../controllers/cardController";

const router = express.Router();

router.post("/:accountNumber", addCard);
router.get("/:accountNumber", getAllCards);
router.put("/:accountNumber/:cardNumber", updateCard);
router.delete("/:accountNumber/:cardNumber", deleteCard);

export default router;
