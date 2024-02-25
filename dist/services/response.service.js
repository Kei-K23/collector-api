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
exports.createResponse = void 0;
const db_1 = require("../lib/db");
const user_service_1 = require("./user.service");
// create new response
//TODO: Need to improve the performance for creating answers
function createResponse({ data }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { formId, userId, answer } = data;
        let createdResponse; // this is the response model object
        try {
            const user = yield (0, user_service_1.getUserByExternalUserId)(userId);
            if (answer && answer.length > 0) {
                // If answer is present and not empty
                createdResponse = yield db_1.db.response.create({
                    data: {
                        formId,
                        userId: user === null || user === void 0 ? void 0 : user.id,
                    },
                    include: {
                        user: true,
                        answer: {
                            include: {
                                answerOption: true,
                                question: true,
                            },
                        },
                    },
                });
                answer.forEach((ans) => __awaiter(this, void 0, void 0, function* () {
                    if (ans.answerOption && ans.answerOption.length > 0) {
                        yield db_1.db.answer.create({
                            data: {
                                questionId: ans.questionId,
                                text: ans.text,
                                responseId: createdResponse.id,
                                answerOption: {
                                    createMany: {
                                        data: [...ans.answerOption],
                                    },
                                },
                            },
                        });
                    }
                    else {
                        yield db_1.db.answer.create({
                            data: {
                                questionId: ans.questionId,
                                text: ans.text,
                                responseId: createdResponse.id,
                            },
                        });
                    }
                }));
            }
            else {
                throw new Error("Answer is required!");
            }
            return createdResponse;
        }
        catch (e) {
            console.log(e);
            throw new Error("Something went wrong when creating responses.");
        }
    });
}
exports.createResponse = createResponse;
