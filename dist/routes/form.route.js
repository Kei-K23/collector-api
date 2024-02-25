"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_controller_1 = require("../controller/form.controller");
const resourceValidation_1 = __importDefault(require("../middlewares/resourceValidation"));
const form_schema_1 = require("../schema/form.schema");
exports.default = (router) => {
    router.get("/forms/:externalUserId", (0, resourceValidation_1.default)(form_schema_1.getAllFormsByUserIdSchema), form_controller_1.getAllFormsByUserIdHandler);
    router.get("/forms/detail/:formId", (0, resourceValidation_1.default)(form_schema_1.getFormByFormIdAndUserIdSchema), form_controller_1.getFormByFormIdAndUserIdHandler);
    router.post("/forms", (0, resourceValidation_1.default)(form_schema_1.createFormSchema), form_controller_1.createFormHandler);
    router.put("/forms/:externalUserId/:formId", (0, resourceValidation_1.default)(form_schema_1.updateFormSchema), form_controller_1.updateFormHandler);
    router.delete("/forms/:formId/:userId", (0, resourceValidation_1.default)(form_schema_1.deleteFormSchema), form_controller_1.deleteFormHandler);
};
