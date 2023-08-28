import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

interface DecodedToken {
  accountNumber: number;
}

export async function getAccount(req: Request, res: Response): Promise<number> {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("No access token provided.");
    }

    const secretKey = process.env.JWT_KEY;
    if (!secretKey) {
      throw new Error("Secret key not found.");
    }

    const decodedToken = jwt.verify(token, secretKey) as DecodedToken;

    const accountNumber = decodedToken.accountNumber;
    return accountNumber;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid access token.");
    } else {
      throw error;
    }
  }
}
