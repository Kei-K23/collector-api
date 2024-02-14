import { Router } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  updateUserHandler,
} from "../controller/user.controller";
import resourceValidation from "../middlewares/resourceValidation";
import {
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
} from "../schema/user.schema";

export default (router: Router) => {
  router.post(
    "/users",
    resourceValidation(createUserSchema),
    createUserHandler,
  );
  router.put(
    "/users/:externalUserId",
    resourceValidation(updateUserSchema),
    updateUserHandler,
  );
  router.delete(
    "/users/:externalUserId",
    resourceValidation(deleteUserSchema),
    deleteUserHandler,
  );
};
