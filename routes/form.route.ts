import { Router } from "express";
import {
  createFormHandler,
  deleteFormHandler,
  getAllFormsByUserIdHandler,
  updateFormHandler,
} from "../controller/form.controller";

export default (router: Router) => {
  router.get("/forms", getAllFormsByUserIdHandler);
  router.get("/forms/:formId", getAllFormsByUserIdHandler);
  router.post("/forms", createFormHandler);
  router.put("/forms/:formId", updateFormHandler);
  router.delete("/forms/:formId/:userId", deleteFormHandler);
};
