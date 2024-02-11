import { Router } from "express";
import {
  createFormHandler,
  getFormsHandler,
} from "../controller/form.controller";

export default (router: Router) => {
  router.get("/forms", getFormsHandler);
  router.post("/forms", createFormHandler);
};
