import { Router } from "express";
import formRoute from "./form.route";
import userRoute from "./user.route";
import questionRoute from "./question.route";
import responseRoute from "./response.route";

const router = Router();

export default () => {
  formRoute(router);
  userRoute(router);
  questionRoute(router);
  responseRoute(router);
  return router;
};
