"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controller/user.controller");
const resourceValidation_1 = __importDefault(require("../middlewares/resourceValidation"));
const user_schema_1 = require("../schema/user.schema");
exports.default = (router) => {
    router.post("/users", (0, resourceValidation_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    router.put("/users/:externalUserId", (0, resourceValidation_1.default)(user_schema_1.updateUserSchema), user_controller_1.updateUserHandler);
    router.delete("/users/:externalUserId", (0, resourceValidation_1.default)(user_schema_1.deleteUserSchema), user_controller_1.deleteUserHandler);
};
