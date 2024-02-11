import { Router } from "express";
import {
  createFormHandler,
  deleteFormHandler,
  getAllFormsByUserIdHandler,
  getFormByFormIdAndUserIdHandler,
  updateFormHandler,
} from "../controller/form.controller";
import resourceValidation from "../middlewares/resourceValidation";
import {
  createFormSchema,
  deleteFormSchema,
  getAllFormsByUserIdSchema,
  getFormByFormIdAndUserIdSchema,
  updateFormSchema,
} from "../schema/form.schema";

export default (router: Router) => {
  router.get(
    "/forms",
    resourceValidation(getAllFormsByUserIdSchema),
    getAllFormsByUserIdHandler
  );
  router.get(
    "/forms/:formId",
    resourceValidation(getFormByFormIdAndUserIdSchema),
    getFormByFormIdAndUserIdHandler
  );
  router.post(
    "/forms",
    resourceValidation(createFormSchema),
    createFormHandler
  );
  router.put(
    "/forms/:formId",
    resourceValidation(updateFormSchema),
    updateFormHandler
  );
  router.delete(
    "/forms/:formId/:userId",
    resourceValidation(deleteFormSchema),
    deleteFormHandler
  );
};
