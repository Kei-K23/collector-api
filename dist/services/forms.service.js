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
exports.getFormByFormIdAndUserId = exports.getAllFormsByUserId = exports.deleteForm = exports.updateForm = exports.createForm = void 0;
const db_1 = require("../lib/db");
const user_service_1 = require("./user.service");
// create new form
function createForm({ data }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.getUserByExternalUserId)(data.externalUserId);
            if (!user) {
                throw new Error("Unauthorized user.");
            }
            return yield db_1.db.form.create({
                data: {
                    title: data.title,
                    description: data.description,
                    userId: user.id,
                },
            });
        }
        catch (e) {
            throw new Error("Something went wrong when creating form.");
        }
    });
}
exports.createForm = createForm;
// update the form
function updateForm({ data }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.getUserByExternalUserId)(data.params.externalUserId);
            if (!user) {
                throw new Error("Unauthorized user.");
            }
            return yield db_1.db.form.update({
                where: {
                    id: data.params.formId,
                    userId: user.id,
                },
                data: Object.assign({}, data.body),
            });
        }
        catch (e) {
            throw new Error("Something went wrong when updating form.");
        }
    });
}
exports.updateForm = updateForm;
// delete the form
function deleteForm({ formId, userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.db.form.delete({
                where: {
                    id: formId,
                    userId,
                },
            });
        }
        catch (e) {
            throw new Error("Something went wrong when deleting form.");
        }
    });
}
exports.deleteForm = deleteForm;
// get all forms with user id
function getAllFormsByUserId({ externalUserId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.getUserByExternalUserId)(externalUserId);
            if (!user) {
                throw new Error("Unauthorized user.");
            }
            return yield db_1.db.form.findMany({
                where: {
                    userId: user.id,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        }
        catch (e) {
            throw new Error("Something went wrong when getting forms.");
        }
    });
}
exports.getAllFormsByUserId = getAllFormsByUserId;
// get form with form id and user id
function getFormByFormIdAndUserId({ formId }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield db_1.db.form.findUnique({
                where: {
                    id: formId,
                },
                include: {
                    user: true,
                    question: {
                        include: {
                            questionOption: {
                                include: {
                                    answerOption: true,
                                },
                                orderBy: {
                                    order: "asc",
                                },
                            },
                            answer: {
                                include: {
                                    answerOption: {
                                        orderBy: {
                                            createdAt: "desc",
                                        },
                                    },
                                },
                                orderBy: {
                                    createdAt: "desc",
                                },
                            },
                        },
                        orderBy: {
                            order: "asc",
                        },
                    },
                    response: {
                        include: {
                            answer: {
                                include: {
                                    answerOption: true,
                                    question: true,
                                },
                            },
                            user: true,
                        },
                    },
                },
            });
        }
        catch (e) {
            throw new Error("Something went wrong when getting form.");
        }
    });
}
exports.getFormByFormIdAndUserId = getFormByFormIdAndUserId;
