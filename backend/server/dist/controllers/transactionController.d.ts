import { Request, Response } from "express";
export declare function createTransaction(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function cancelTransaction(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function transferToSavingAccount(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function transferFromSavingAccount(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getAllAccountTransactions(req: Request, res: Response): Promise<void>;
