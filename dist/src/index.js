"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const server_1 = __importDefault(require("../lib/server"));
const PORT = config_1.default.get("PORT");
const app = (0, server_1.default)();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
