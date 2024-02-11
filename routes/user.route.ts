import { Router } from "express";
import { getFormsHandler } from "../controller/form.controller";
import { createUserHandler } from "../controller/user.controller";

export default (router: Router) => {
  router.post("/users", createUserHandler);
};
