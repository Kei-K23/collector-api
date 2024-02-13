import { Router } from "express";

import resourceValidation from "../middlewares/resourceValidation";

import {
  createQuestionSchema,
  deleteQuestionSchema,
  updateQuestionSchema,
} from "../schema/questions.schema";
import {
  createQuestionHandler,
  deleteQuestionHandler,
  updateQuestionHandler,
} from "../controller/question.controller";
import { createResponseSchema } from "../schema/response.schema";
import { createResponseHandler } from "../controller/response.controller";

export default (router: Router) => {
  router.post(
    "/responses",
    resourceValidation(createResponseSchema),
    createResponseHandler
  );
  router.put(
    "/questions/:questionId/:formId",
    resourceValidation(updateQuestionSchema),
    updateQuestionHandler
  );
  router.delete(
    "/questions/:questionId/:formId",
    resourceValidation(deleteQuestionSchema),
    deleteQuestionHandler
  );
};
