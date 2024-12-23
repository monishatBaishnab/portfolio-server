"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Create an instance of the Express Application
const app = (0, express_1.default)();
// Middlewares
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["*"],
}));
// Define a GET route for the root URL
app.get("/", (req, res) => {
    res.send({
        success: true,
        status: 200,
        message: "Server running smoothly.",
    });
});
exports.default = app;
