import { Router } from "express";

import resourceValidation from "../middlewares/resourceValidation";

import {
  createQuestionSchema,
  deleteQuestionOptionSchema,
  deleteQuestionSchema,
  updateQuestionSchema,
} from "../schema/questions.schema";
import {
  createQuestionHandler,
  deleteQuestionHandler,
  deleteQuestionOptionHandler,
  updateQuestionHandler,
} from "../controller/question.controller";

export default (router: Router) => {
  router.post(
    "/questions",
    resourceValidation(createQuestionSchema),
    createQuestionHandler,
  );
  router.put(
    "/questions/:questionId/:formId",
    resourceValidation(updateQuestionSchema),
    updateQuestionHandler,
  );
  router.delete(
    "/questions/:questionId/:formId",
    resourceValidation(deleteQuestionSchema),
    deleteQuestionHandler,
  );
  router.delete(
    "/questions/:questionId/:formId/:questionOptionId",
    resourceValidation(deleteQuestionOptionSchema),
    deleteQuestionOptionHandler,
  );
};
