"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormByFormIdAndUserIdSchema = exports.getAllFormsByUserIdSchema = exports.deleteFormSchema = exports.updateFormSchema = exports.createFormSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// create new form validation
exports.createFormSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default
            .string({
            required_error: "Title is required!",
        })
            .min(2, {
            message: "Title should be at least 2 character2.",
        }),
        description: zod_1.default.string().optional(),
        externalUserId: zod_1.default.string({
            required_error: "External user id is required!",
        }),
    }),
});
// update form validation
exports.updateFormSchema = zod_1.default.object({
    params: zod_1.default.object({
        formId: zod_1.default.string({
            required_error: "Form id is required!",
        }),
        externalUserId: zod_1.default.string({
            required_error: "External user id is required!",
        }),
    }),
    body: zod_1.default.object({
        title: zod_1.default
            .string()
            .min(2, {
            message: "Title should be at least 2 characters.",
        })
            .optional(),
        description: zod_1.default.string().optional(),
    }),
});
// update form validation
exports.deleteFormSchema = zod_1.default.object({
    params: zod_1.default.object({
        formId: zod_1.default.string({
            required_error: "Form id is required!",
        }),
        userId: zod_1.default.string({
            required_error: "User id is required!",
        }),
    }),
});
// get forms with user id validation
exports.getAllFormsByUserIdSchema = zod_1.default.object({
    params: zod_1.default.object({
        externalUserId: zod_1.default.string({
            required_error: "External user id is required!",
        }),
    }),
});
// get form with form id and user id validation
exports.getFormByFormIdAndUserIdSchema = zod_1.default.object({
    params: zod_1.default.object({
        formId: zod_1.default.string({
            required_error: "Form id is required!",
        }),
    }),
});
