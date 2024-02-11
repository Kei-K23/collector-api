import { Request, Response } from "express";
import { CreateFormSchema } from "../schema/form.schema";
import { createForm } from "../services/forms.service";

export async function createFormHandler(
  req: Request<{}, {}, CreateFormSchema>,
  res: Response
) {
  try {
    const data = req.body;

    const form = await createForm({ data });

    return res.status(201).json({
      status: 201,
      success: true,
      data: form,
    });
  } catch (e: any) {
    return res
      .status(500)
      .json({
        status: 500,
        success: false,
        error: e.message,
      })
      .end();
  }
}

export async function getFormsHandler(req: Request, res: Response) {
  return res.json({
    success: true,
  }).end;
}
