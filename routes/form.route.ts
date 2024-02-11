import { Router } from "express";
import {
  createFormHandler,
  getAllFormsByUserIdHandler,
  updateFormHandler,
} from "../controller/form.controller";

export default (router: Router) => {
  router.get("/forms", getAllFormsByUserIdHandler);
  router.post("/forms", createFormHandler);
  router.put("/forms/:formId", updateFormHandler);
};
