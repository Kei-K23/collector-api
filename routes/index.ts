import { Router } from "express";
import formRoute from "./form.route";

const router = Router();

export default () => {
  formRoute(router);
  return router;
};
