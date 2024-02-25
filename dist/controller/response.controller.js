"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestionHandler = exports.updateQuestionHandler = exports.createResponseHandler = void 0;
const questions_service_1 = require("../services/questions.service");
const response_service_1 = require("../services/response.service");
function createResponseHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const response = yield (0, response_service_1.createResponse)({ data });
            return res.status(201).json({
                status: 201,
                success: true,
                message: "Successfully created new response.",
                data: response,
            });
        }
        catch (e) {
            return res
                .status(500)
                .json({
                status: 500,
                success: false,
                message: e.message,
            })
                .end();
        }
    });
}
exports.createResponseHandler = createResponseHandler;
function updateQuestionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateData = {
                data: {
                    params: {
                        formId: req.params.formId,
                        questionId: req.params.questionId,
                    },
                    body: req.body,
                },
                questionId: req.params.questionId,
            };
            const data = yield (0, questions_service_1.updateQuestion)(updateData);
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Successfully edited the question.",
                data,
            });
        }
        catch (e) {
            return res
                .status(500)
                .json({
                status: 500,
                success: false,
                message: e.message,
            })
                .end();
        }
    });
}
exports.updateQuestionHandler = updateQuestionHandler;
function deleteQuestionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, questions_service_1.deleteQuestion)(req.params);
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Successfully deleted the question.",
            });
        }
        catch (e) {
            return res
                .status(500)
                .json({
                status: 500,
                success: false,
                message: e.message,
            })
                .end();
        }
    });
}
exports.deleteQuestionHandler = deleteQuestionHandler;
