import { Router } from "express";
import formRoute from "./form.route";
import userRoute from "./user.route";
import questionRoute from "./question.route";

const router = Router();

export default () => {
  formRoute(router);
  userRoute(router);
  questionRoute(router);
  return router;
};
