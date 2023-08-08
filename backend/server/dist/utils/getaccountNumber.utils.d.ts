import { Request, Response } from "express";
export declare function getAccount(req: Request, res: Response): Promise<string | Response<any, Record<string, any>>>;
