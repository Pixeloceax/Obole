import express from "express";
import {
  createTransaction,
  cancelTransaction,
  getAllTransactions,
  getAllAccountTransactions,
} from "../controllers/transactionController";

const router = express.Router();

router.post("/:sourceAccount/:destinationAccount", createTransaction);
router.put("/:transactionId/cancel", cancelTransaction);
router.get("/", getAllTransactions);
router.get("/:accountNumber", getAllAccountTransactions);

export default router;
