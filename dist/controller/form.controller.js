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
exports.getFormByFormIdAndUserIdHandler = exports.getAllFormsByUserIdHandler = exports.deleteFormHandler = exports.updateFormHandler = exports.createFormHandler = void 0;
const forms_service_1 = require("../services/forms.service");
function createFormHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const form = yield (0, forms_service_1.createForm)({ data });
            return res.status(201).json({
                status: 201,
                success: true,
                message: "Successfully created new form.",
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
exports.createFormHandler = createFormHandler;
function updateFormHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, forms_service_1.updateForm)({
                data: {
                    body: req.body,
                    params: req.params,
                },
            });
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Successfully updated the form.",
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
exports.updateFormHandler = updateFormHandler;
function deleteFormHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, forms_service_1.deleteForm)(req.params);
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Successfully deleted the form.",
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
exports.deleteFormHandler = deleteFormHandler;
function getAllFormsByUserIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { externalUserId } = req.params;
            const data = yield (0, forms_service_1.getAllFormsByUserId)({ externalUserId });
            return res.status(200).json({
                status: 200,
                success: true,
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
exports.getAllFormsByUserIdHandler = getAllFormsByUserIdHandler;
function getFormByFormIdAndUserIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { formId } = req.params;
            const data = yield (0, forms_service_1.getFormByFormIdAndUserId)({ formId });
            return res.status(200).json({
                status: 200,
                success: true,
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
exports.getFormByFormIdAndUserIdHandler = getFormByFormIdAndUserIdHandler;
