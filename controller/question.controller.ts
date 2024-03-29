import { Request, Response } from "express";
import {
  CreateQuestionSchema,
  DeleteQuestionOptionSchema,
  DeleteQuestionSchema,
  UpdateQuestionSchema,
} from "../schema/questions.schema";
import {
  createQuestion,
  deleteQuestion,
  deleteQuestionOption,
  updateQuestion,
} from "../services/questions.service";
import axios from "axios";

export async function createQuestionHandler(
  req: Request<{}, {}, CreateQuestionSchema>,
  res: Response
) {
  try {
    const data = req.body;

    const form = await createQuestion({ data });

    return res.status(201).json({
      status: 201,
      success: true,
      message: "Successfully created new question.",
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

export async function updateQuestionHandler(
  req: Request<
    UpdateQuestionSchema["params"],
    {},
    UpdateQuestionSchema["body"]
  >,
  res: Response
) {
  try {
    const updateData = {
      data: {
        params: {
          formId: req.params.formId,
          questionId: req.params.questionId,
        },
        body: req.body,
      },
      questionId: req.params.questionId,
    };

    const data = await updateQuestion(updateData);

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

export async function deleteQuestionOptionHandler(
  req: Request<DeleteQuestionOptionSchema>,
  res: Response
) {
  try {
    await deleteQuestionOption(req.params);

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Successfully deleted the question option.",
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
