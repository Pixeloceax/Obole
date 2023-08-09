import express from "express";
import {
  createTransaction,
  cancelTransaction,
  // getAllTransactions,
  getAllAccountTransactions,
} from "../controllers/transactionController";

const router = express.Router();

router.post("/:destinationAccount", createTransaction);
router.put("/:transactionId/cancel", cancelTransaction);
// router.get("/", getAllTransactions);
router.get("/", getAllAccountTransactions);

export default router;
