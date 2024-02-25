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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestionOptionHandler = exports.deleteQuestionHandler = exports.updateQuestionHandler = exports.createQuestionHandler = void 0;
const questions_service_1 = require("../services/questions.service");
const axios_1 = __importDefault(require("axios"));
function createQuestionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const form = yield (0, questions_service_1.createQuestion)({ data });
            axios_1.default.post("http://localhost:3000/api/webhooks/test", {
                success: "This is webhook success",
            });
            return res.status(201).json({
                status: 201,
                success: true,
                message: "Successfully created new question.",
                data: form,
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
exports.createQuestionHandler = createQuestionHandler;
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
function deleteQuestionOptionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, questions_service_1.deleteQuestionOption)(req.params);
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Successfully deleted the question option.",
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
exports.deleteQuestionOptionHandler = deleteQuestionOptionHandler;
