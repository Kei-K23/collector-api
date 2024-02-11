import { Router } from "express";
import { createUserHandler } from "../controller/user.controller";

export default (router: Router) => {
  router.post("/users", createUserHandler);
};
