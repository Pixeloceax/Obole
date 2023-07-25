import { Request, Response } from "express";
export declare function getAccountBalance(accountNumber: string): Promise<number | undefined>;
export declare function updateAccountBalance(accountNumber: string, newBalance: number): Promise<void>;
export declare function createTransaction(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
