import express from "express";
import {
  addCard,
  getAllCards,
  updateCard,
  deleteCard,
} from "../controllers/cardController";

const router = express.Router();


router.post("/", addCard);
router.get("/", getAllCards);
router.put("/:cardNumber", updateCard);
router.delete("/:cardNumber", deleteCard);

export default router;
