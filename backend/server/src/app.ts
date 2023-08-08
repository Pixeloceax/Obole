import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import loginRouter from "./routes/login.route";
import registerRouter from "./routes/register.route";
import cardRouter from "./routes/card.route";
import transactionRouter from "./routes/transaction.route";
import paymentRouter from "./routes/payment.route";

import dbConnect from "./database/dbConnect";
import { authenticateToken } from "./middleware/auth";
import { getUserInfo } from "./controllers/userController";

const app = express();

dbConnect();

app.use(cors());
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
app.use("/payment", authenticateToken, paymentRouter);

app.get("/free-endpoint", (req: Request, res: Response) => {
  res.json({ message: "You are free to access me anytime" });
});

app.get(
  "/protected-endpoint",
  authenticateToken,
  (req: Request, res: Response) => {
    res.json({ message: "You are authorized to access me" });
  }
);

export default app;
