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
exports.deleteUserHandler = exports.updateUserHandler = exports.createUserHandler = void 0;
const user_service_1 = require("../services/user.service");
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const user = yield (0, user_service_1.createUser)({ data });
            return res.status(201).json({
                status: 201,
                success: true,
                message: "Successfully created new user.",
                data: user,
            });
        }
        catch (e) {
            return res
                .status(500)
                .json({
                status: 500,
                success: false,
                error: e.message,
            })
                .end();
        }
    });
}
exports.createUserHandler = createUserHandler;
function updateUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.updateUser)({
                data: {
                    body: req.body,
                    params: req.params,
                },
            });
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Successfully updated the user.",
                data: user,
            });
        }
        catch (e) {
            return res
                .status(500)
                .json({
                status: 500,
                success: false,
                error: e.message,
            })
                .end();
        }
    });
}
exports.updateUserHandler = updateUserHandler;
function deleteUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, user_service_1.deleteUser)({
                externalUserId: req.params.externalUserId,
            });
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Successfully deleted the user.",
            });
        }
        catch (e) {
            return res
                .status(500)
                .json({
                status: 500,
                success: false,
                error: e.message,
            })
                .end();
        }
    });
}
exports.deleteUserHandler = deleteUserHandler;
