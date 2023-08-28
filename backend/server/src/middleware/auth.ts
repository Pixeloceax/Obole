import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  if (!process.env.JWT_KEY) {
    return res.status(500).send("JWT_KEY not defined in environment variables");
  }

  if (!process.env.JWT_KEY) {
    return res.status(500).send("JWT_KEY not defined in environment variables");
  }

  jwt.verify(
    token,
    process.env.JWT_KEY,
    (err: jwt.VerifyErrors | null, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    }
  );
}
