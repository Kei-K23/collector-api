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
exports.deleteQuestionOption = exports.deleteQuestion = exports.updateQuestion = exports.createQuestion = void 0;
const client_1 = require("@prisma/client");
const db_1 = require("../lib/db");
// create new question
function createQuestion({ data }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: questionData } = data;
        try {
            const createdQuestions = yield Promise.all(questionData.map((question) => __awaiter(this, void 0, void 0, function* () {
                const { formId, text, type, questionOption, order, description } = question;
                let createdQuestion;
                if (questionOption && questionOption.length > 0) {
                    // If questionOption is present and not empty
                    createdQuestion = yield db_1.db.question.create({
                        data: {
                            formId,
                            text,
                            type,
                            description,
                            order,
                            questionOption: {
                                createMany: {
                                    data: questionOption,
                                },
                            },
                        },
                        include: {
                            questionOption: true,
                        },
                    });
                }
                else {
                    // If questionOption is absent or empty
                    createdQuestion = yield db_1.db.question.create({
                        data: {
                            order,
                            formId,
                            description,
                            text,
                            type,
                        },
                    });
                }
                return createdQuestion;
            })));
            return createdQuestions;
        }
        catch (e) {
            throw new Error("Something went wrong when creating questions.");
        }
    });
}
exports.createQuestion = createQuestion;
// update the question
function updateQuestion({ data, questionId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let updatedQuestion;
            // Update the question
            updatedQuestion = yield db_1.db.question.update({
                where: {
                    id: data.params.questionId,
                    formId: data.params.formId,
                },
                data: {
                    text: data.body.text,
                    type: data.body.type,
                    description: data.body.description,
                    order: data.body.order,
                },
                include: {
                    questionOption: true,
                },
            });
            if (data.body.type === client_1.QuestionType["SHORT_ANSWER"] ||
                data.body.type === client_1.QuestionType["PARAGRAPH"]) {
                if (updatedQuestion.questionOption &&
                    updatedQuestion.questionOption.length > 0) {
                    yield db_1.db.questionOption.deleteMany({
                        where: {
                            questionId: questionId,
                        },
                    });
                    return;
                }
            }
            // Update question options if provided
            if (data.body.questionOption && data.body.questionOption.length > 0) {
                yield Promise.all(data.body.questionOption.map((option) => __awaiter(this, void 0, void 0, function* () {
                    if (option.id) {
                        // If option ID is provided, update the existing option
                        yield db_1.db.questionOption.update({
                            where: {
                                id: option.id,
                            },
                            data: {
                                option: option.option,
                                order: option.order,
                            },
                            include: {
                                question: true,
                            },
                        });
                    }
                    else {
                        // If option ID is not provided, create a new option
                        yield db_1.db.questionOption.create({
                            data: {
                                questionId: data.params.questionId,
                                option: option.option,
                                order: option.order,
                            },
                            include: {
                                question: true,
                            },
                        });
                    }
                })));
            }
            return updatedQuestion;
        }
        catch (e) {
            throw new Error("Something went wrong when updating question.");
        }
    });
}
exports.updateQuestion = updateQuestion;
// delete the question
function deleteQuestion({ formId, questionId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.db.question.delete({
                where: {
                    id: questionId,
                    formId,
                },
            });
        }
        catch (e) {
            throw new Error("Something went wrong when deleting question.");
        }
    });
}
exports.deleteQuestion = deleteQuestion;
// delete the question option
function deleteQuestionOption({ questionId, questionOptionId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.db.questionOption.delete({
                where: {
                    id: questionOptionId,
                    questionId: questionId,
                },
            });
        }
        catch (e) {
            throw new Error("Something went wrong when deleting question option.");
        }
    });
}
exports.deleteQuestionOption = deleteQuestionOption;
