import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { getAccount } from "../utils/getaccountNumber.utils";

export async function getUserInfo(req: Request, res: Response) {
  try {
    const accountNumber = await getAccount(req, res);
    const userInfo = await User.findOne({
      "Account.accountNumber": accountNumber,
    });

    if (!userInfo) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json(userInfo);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ error: "Invalid access token." });
    } else {
      return res.status(500).json({ error: "Server error" });
    }
  }
}
