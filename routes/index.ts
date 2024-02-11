import { Router } from "express";
import formRoute from "./form.route";
import userRoute from "./user.route";

const router = Router();

export default () => {
  formRoute(router);
  userRoute(router);
  return router;
};
