import { Request, Response } from "express";
import {
  CreateFormSchema,
  GetAllFormsByUserIdSchema,
  UpdateFormSchema,
} from "../schema/form.schema";
import {
  createForm,
  getAllFormsByUserId,
  updateForm,
} from "../services/forms.service";

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
        message: e.message,
      })
      .end();
  }
}

export async function updateFormHandler(
  req: Request<UpdateFormSchema["params"], {}, UpdateFormSchema["body"]>,
  res: Response
) {
  try {
    const data = await updateForm({
      data: {
        body: req.body,
        params: req.params,
      },
    });

    return res.status(201).json({
      status: 201,
      success: true,
      message: "Successfully edited the form.",
      data,
    });
  } catch (e: any) {
    return res
      .status(500)
      .json({
        status: 500,
        success: false,
        message: e.message,
      })
      .end();
  }
}

export async function getAllFormsByUserIdHandler(
  req: Request<{}, {}, {}, GetAllFormsByUserIdSchema>,
  res: Response
) {
  try {
    const { userId } = req.query;
    const data = await getAllFormsByUserId({ userId });
    return res.status(200).json({
      status: 200,
      success: true,
      data,
    });
  } catch (e: any) {
    return res
      .status(500)
      .json({
        status: 500,
        success: false,
        message: e.message,
      })
      .end();
  }
}
