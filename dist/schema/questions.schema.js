"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestionOptionSchema = exports.deleteQuestionSchema = exports.updateQuestionSchema = exports.createQuestionSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// create new question validation
exports.createQuestionSchema = zod_1.default.object({
    body: zod_1.default.object({
        data: zod_1.default.array(zod_1.default.object({
            formId: zod_1.default.string({
                required_error: "Form id is required!",
            }),
            text: zod_1.default
                .string({
                required_error: "Text is required!",
            })
                .min(2, { message: "Text should be at least 2 characters." }),
            type: zod_1.default.enum([
                "SHORT_ANSWER",
                "PARAGRAPH",
                "MULTIPLE_CHOICE",
                "CHECKBOXES",
                "DROPDOWN",
            ]),
            description: zod_1.default.string().optional(),
            order: zod_1.default.number(),
            questionOption: zod_1.default
                .array(zod_1.default.object({
                option: zod_1.default
                    .string({
                    required_error: "Option is required",
                })
                    .min(2, { message: "Option should be at least 2 characters." }),
                order: zod_1.default.number(),
            }))
                .optional(),
        })),
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
        order: zod_1.default.number().optional(),
        questionOption: zod_1.default
            .array(zod_1.default.object({
            id: zod_1.default.string({ required_error: "Option id is required!" }).optional(),
            option: zod_1.default
                .string({
                required_error: "Option is required",
            })
                .min(2, { message: "Option should be at least 2 characters." }),
            order: zod_1.default.number(),
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
// update question validation
exports.deleteQuestionOptionSchema = zod_1.default.object({
    params: zod_1.default.object({
        questionId: zod_1.default.string({
            required_error: "Question id is required!",
        }),
        questionOptionId: zod_1.default.string({
            required_error: "Question option id is required!",
        }),
    }),
});
