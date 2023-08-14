import express from "express";
import {
  createTransaction,
  cancelTransaction,
  // getAllTransactions,
  getAllAccountTransactions,
  transferFromSavingAccount,
  transferToSavingAccount,
} from "../controllers/transactionController";

const router = express.Router();

router.post("/:destinationAccount", createTransaction);
router.put("/:transactionId/cancel", cancelTransaction);
router.put("/saving", transferToSavingAccount);
router.put("/unsaving", transferFromSavingAccount);
// router.get("/", getAllTransactions);
router.get("/", getAllAccountTransactions);

export default router;
