import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import loginRouter from "./routes/login.route";
import registerRouter from "./routes/register.route";
import cardRouter from "./routes/card.route";
import transactionRouter from "./routes/transaction.route";
import paymentRouter from "./routes/payment.route";
import statsRouter from "./routes/stats.route";
import savingRouter from "./routes/saving.route";

import dbConnect from "./database/dbConnect";
import { authenticateToken } from "./middleware/auth";
import { getUserInfo } from "./controllers/userController";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();

dbConnect();

const corsOptions: cors.CorsOptions = {
  origin: [process.env.CORS_ORIGIN || "", process.env.CORS_ORIGIN_DEV || ""],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response, next) => {
  res.json({ message: "Hey ! server is actualy running" });
  next();
});

app.post("/login", loginRouter);
app.post("/register", registerRouter);

app.get("/user", authenticateToken, getUserInfo);
app.use("/card", authenticateToken, cardRouter);
app.use("/transaction", authenticateToken, transactionRouter);
app.use("/payment", paymentRouter);
app.use("/stats", authenticateToken, statsRouter);
app.use("/saving", authenticateToken, savingRouter);

export default app;
