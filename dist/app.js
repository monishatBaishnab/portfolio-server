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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes/routes");
const http_status_1 = __importDefault(require("http-status"));
const handleAsyncErrors_1 = __importDefault(require("./app/utils/handleAsyncErrors"));
const respond_1 = __importDefault(require("./app/utils/respond"));
const notFoundRoute_1 = __importDefault(require("./app/middlewares/notFoundRoute"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
// Create an instance of the Express Application
const app = (0, express_1.default)();
// Middlewares
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:5173"],
}));
// Define a GET route for the root URL
app.get("/", (0, handleAsyncErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Respond final result to client
    (0, respond_1.default)(res, {
        message: "Server login successfully.",
        status: http_status_1.default.OK,
    });
})));
// Define all routes for the application
app.use("/api/v1", routes_1.routes);
// Middleware to handle 404 (Not Found) errors
app.use("*", notFoundRoute_1.default);
// Middleware to handle global errors
app.use(globalErrorHandler_1.default);
exports.default = app;
