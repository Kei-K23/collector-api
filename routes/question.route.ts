import { Router } from "express";

import resourceValidation from "../middlewares/resourceValidation";

import { createQuestionSchema } from "../schema/questions.schema";
import { createQuestionHandler } from "../controller/question.controller";

export default (router: Router) => {
  router.post(
    "/questions",
    resourceValidation(createQuestionSchema),
    createQuestionHandler
  );
  // router.put(
  //   "/forms/:formId",
  //   resourceValidation(updateFormSchema),
  //   updateFormHandler
  // );
  // router.delete(
  //   "/forms/:formId/:userId",
  //   resourceValidation(deleteFormSchema),
  //   deleteFormHandler
  // );
};
