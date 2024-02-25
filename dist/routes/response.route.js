"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resourceValidation_1 = __importDefault(require("../middlewares/resourceValidation"));
const questions_schema_1 = require("../schema/questions.schema");
const question_controller_1 = require("../controller/question.controller");
const response_schema_1 = require("../schema/response.schema");
const response_controller_1 = require("../controller/response.controller");
exports.default = (router) => {
    router.post("/responses", (0, resourceValidation_1.default)(response_schema_1.createResponseSchema), response_controller_1.createResponseHandler);
    router.put("/questions/:questionId/:formId", (0, resourceValidation_1.default)(questions_schema_1.updateQuestionSchema), question_controller_1.updateQuestionHandler);
    router.delete("/questions/:questionId/:formId", (0, resourceValidation_1.default)(questions_schema_1.deleteQuestionSchema), question_controller_1.deleteQuestionHandler);
};
