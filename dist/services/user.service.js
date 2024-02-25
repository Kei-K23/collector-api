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
exports.getUserByExternalUserId = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const db_1 = require("../lib/db");
function createUser({ data }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield db_1.db.user.create({
                data,
            });
        }
        catch (e) {
            throw new Error("Something went wrong when creating user.");
        }
    });
}
exports.createUser = createUser;
function updateUser({ data }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield db_1.db.user.update({
                where: {
                    externalUserId: data.params.externalUserId,
                },
                data: Object.assign({}, data.body),
            });
        }
        catch (e) {
            throw new Error("Something went wrong when updating user.");
        }
    });
}
exports.updateUser = updateUser;
function deleteUser({ externalUserId }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.db.user.delete({
                where: {
                    externalUserId,
                },
            });
        }
        catch (e) {
            throw new Error("Something went wrong when deleting user.");
        }
    });
}
exports.deleteUser = deleteUser;
function getUserByExternalUserId(externalUserId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield db_1.db.user.findUnique({
                where: {
                    externalUserId,
                },
            });
        }
        catch (e) {
            throw new Error("Something went wrong when getting user.");
        }
    });
}
exports.getUserByExternalUserId = getUserByExternalUserId;
