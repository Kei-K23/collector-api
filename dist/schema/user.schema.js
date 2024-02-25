"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// create user validation
exports.createUserSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .string({
            required_error: "Name is required!",
        })
            .min(2, {
            message: "Name should be at least 2 characters.",
        }),
        username: zod_1.default
            .string({
            required_error: "User name is required!",
        })
            .min(1, {
            message: "User name should be at least 1 characters.",
        }),
        email: zod_1.default
            .string({
            required_error: "Email is required!",
        })
            .email(),
        imageUrl: zod_1.default.string().optional(),
        externalUserId: zod_1.default.string({
            required_error: "External user id is required!",
        }),
    }),
});
// update user validation
exports.updateUserSchema = zod_1.default.object({
    params: zod_1.default.object({
        externalUserId: zod_1.default.string({
            required_error: "External user id is required!",
        }),
    }),
    body: zod_1.default.object({
        name: zod_1.default
            .string()
            .min(2, {
            message: "Name should be at least 2 characters.",
        })
            .optional(),
        username: zod_1.default
            .string()
            .min(1, {
            message: "User name should be at least 1 characters.",
        })
            .optional(),
        email: zod_1.default.string().email().optional(),
        imageUrl: zod_1.default.string().optional(),
    }),
});
// update user validation
exports.deleteUserSchema = zod_1.default.object({
    params: zod_1.default.object({
        externalUserId: zod_1.default.string({
            required_error: "External user id is required!",
        }),
    }),
});
