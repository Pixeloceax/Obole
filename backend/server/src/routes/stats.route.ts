import express from "express";
import { getPaymentAndTransactionDataForStats } from "../controllers/statsController";

const router = express.Router();

router.get("/", getPaymentAndTransactionDataForStats);

export default router;
