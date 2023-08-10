import express from "express";
import { authenticateToken } from "../middleware/auth";
import {
  processPayment,
  getAllAccountPayments,
} from "../controllers/paymentController";

const router = express.Router();

router.post("/", processPayment);
router.get("/", authenticateToken, getAllAccountPayments);

export default router;
