import { Router } from "express";
import { getFormsHandler } from "../controller/form.controller";

export default (router: Router) => {
  router.get("/forms", getFormsHandler);
};
