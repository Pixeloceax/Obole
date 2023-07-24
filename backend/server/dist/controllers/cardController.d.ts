import { Request, Response } from "express";
export declare function addCard(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getAllCards(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateCard(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteCard(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
