import { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
    accountNumber: string;
}

export async function getAccount(req: Request, res: Response) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "No access token provided." });
        }

        const secretKey = process.env.SECRET_KEY || "SECRET_KEY";
        if (!secretKey) {
            return res.status(500).json({ error: "Server error" });
        }

        const decodedToken = jwt.verify(token, secretKey) as DecodedToken;

        const accountNumber = decodedToken.accountNumber;
        return accountNumber;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ error: "Invalid access token." });
        } else {
            return res.status(500).json({ error: "Server error" });
        }
    }
}