import { Request, Response } from "express";
import {
  CreateQuestionSchema,
  DeleteQuestionSchema,
  UpdateQuestionSchema,
} from "../schema/questions.schema";
import {
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "../services/questions.service";
import { CreateResponseSchema } from "../schema/response.schema";
import { createResponse } from "../services/response.service";

export async function createResponseHandler(
  req: Request<{}, {}, CreateResponseSchema>,
  res: Response
) {
  try {
    const data = req.body;

    const response = await createResponse({ data });

    return res.status(201).json({
      status: 201,
      success: true,
      message: "Successfully created new response.",
      data: response,
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

export async function updateQuestionHandler(
  req: Request<
    UpdateQuestionSchema["params"],
    {},
    UpdateQuestionSchema["body"]
  >,
  res: Response
) {
  try {
    const data = await updateQuestion({
      data: {
        body: req.body,
        params: req.params,
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Successfully edited the question.",
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

export async function deleteQuestionHandler(
  req: Request<DeleteQuestionSchema>,
  res: Response
) {
  try {
    await deleteQuestion(req.params);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Successfully deleted the question.",
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
