import express from "express";
import { createTransaction } from "../controllers/transactionController";

const router = express.Router();

router.post("/:sourceAccount/:destinationAccount", createTransaction);

export default router;
