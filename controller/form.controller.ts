import { Request, Response } from "express";
import {
  CreateFormSchema,
  DeleteFormSchema,
  GetAllFormsByUserIdSchema,
  GetFormByFormIdAndUserIdSchema,
  UpdateFormSchema,
} from "../schema/form.schema";
import {
  createForm,
  deleteForm,
  getAllFormsByUserId,
  getFormByFormIdAndUserId,
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
      message: "Successfully created new form.",
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

    return res.status(200).json({
      status: 200,
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

export async function deleteFormHandler(
  req: Request<DeleteFormSchema>,
  res: Response
) {
  try {
    await deleteForm(req.params);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Successfully deleted the form.",
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

export async function getFormByFormIdAndUserIdHandler(
  req: Request<
    GetFormByFormIdAndUserIdSchema["params"],
    {},
    {},
    GetFormByFormIdAndUserIdSchema["query"]
  >,
  res: Response
) {
  try {
    const { userId } = req.query;
    const { formId } = req.params;

    const data = await getFormByFormIdAndUserId({ userId, formId });

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
