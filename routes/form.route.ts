import { Router } from "express";
import {
  createFormHandler,
  getAllFormsByUserIdHandler,
} from "../controller/form.controller";

export default (router: Router) => {
  router.get("/forms", getAllFormsByUserIdHandler);
  router.post("/forms", createFormHandler);
};
