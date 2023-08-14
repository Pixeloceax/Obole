import { Request, Response } from "express";
export declare const openSaving: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSaving: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
