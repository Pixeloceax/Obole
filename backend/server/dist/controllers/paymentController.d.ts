import { Request, Response } from "express";
export declare function getAllAccountPayments(req: Request, res: Response): Promise<void>;
export declare function processPayment(req: Request, res: Response): Promise<void>;
export declare function processRefund(req: Request, res: Response): Promise<void>;
