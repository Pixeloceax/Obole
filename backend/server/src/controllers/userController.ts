import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

interface DecodedToken {
  accountNumber: string;
}

export async function getUserInfo(req: Request, res: Response) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No access token provided." });
  }

  try {
    const secretKey = process.env.SECRET_KEY || "SECRET_KEY";
    if (!secretKey) {
      return res.status(500).json({ error: "Server error" });
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;

    const accountNumber = decodedToken.accountNumber;
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
