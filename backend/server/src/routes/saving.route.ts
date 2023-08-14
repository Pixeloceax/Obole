import express from "express";
import { openSaving, getSaving } from "../controllers/savingController";

const router = express.Router();

router.post("/", openSaving);
router.get("/", getSaving);

export default router;
