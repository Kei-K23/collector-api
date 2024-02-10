import { Request, Response } from "express";

export async function getFormsHandler(req: Request, res: Response) {
  return res.json({
    success: true,
  }).end;
}
