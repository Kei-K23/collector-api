"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const form_route_1 = __importDefault(require("./form.route"));
const user_route_1 = __importDefault(require("./user.route"));
const question_route_1 = __importDefault(require("./question.route"));
const response_route_1 = __importDefault(require("./response.route"));
const router = (0, express_1.Router)();
exports.default = () => {
    (0, form_route_1.default)(router);
    (0, user_route_1.default)(router);
    (0, question_route_1.default)(router);
    (0, response_route_1.default)(router);
    return router;
};
