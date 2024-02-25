"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestionSchema = exports.updateQuestionSchema = exports.createResponseSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// create new question validation
exports.createResponseSchema = zod_1.default.object({
    body: zod_1.default.object({
        formId: zod_1.default.string({
            required_error: "Form id is required!",
        }),
        userId: zod_1.default.string({
            required_error: "User id is required!",
        }),
        answer: zod_1.default
            .array(zod_1.default.object({
            text: zod_1.default
                .string({
                required_error: "Text is required",
            })
                .min(2, { message: "Text should be at least 2 characters." })
                .optional(),
            questionId: zod_1.default.string({
                required_error: "Question id is required!",
            }),
            answerOption: zod_1.default
                .array(zod_1.default.object({
                questionOptionId: zod_1.default.string({
                    required_error: "Question id is required!",
                }),
            }))
                .optional(),
        }))
            .min(1, { message: "At least one answer is required!" }),
    }),
});
// update question validation
exports.updateQuestionSchema = zod_1.default.object({
    params: zod_1.default.object({
        formId: zod_1.default.string({
            required_error: "Form id is required!",
        }),
        questionId: zod_1.default.string({
            required_error: "Question id is required!",
        }),
    }),
    body: zod_1.default.object({
        text: zod_1.default
            .string({ required_error: "Text is required!" })
            .min(2, { message: "Text should be at least 2 characters." })
            .optional(),
        type: zod_1.default
            .enum([
            "SHORT_ANSWER",
            "PARAGRAPH",
            "MULTIPLE_CHOICE",
            "CHECKBOXES",
            "DROPDOWN",
        ])
            .optional(),
        description: zod_1.default.string().optional(),
        questionOption: zod_1.default
            .array(zod_1.default.object({
            id: zod_1.default.string({ required_error: "Option id is required!" }),
            option: zod_1.default
                .string({
                required_error: "Option is required",
            })
                .min(2, { message: "Option should be at least 2 characters." }),
        }))
            .optional(),
    }),
});
// update question validation
exports.deleteQuestionSchema = zod_1.default.object({
    params: zod_1.default.object({
        formId: zod_1.default.string({
            required_error: "Form id is required!",
        }),
        questionId: zod_1.default.string({
            required_error: "Question id is required!",
        }),
    }),
});
