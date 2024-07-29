"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
// import * as sanitize from 'sanitize';
const express_rate_limit_1 = require("express-rate-limit");
const samplesRouter_1 = __importDefault(require("./routers/samplesRouter"));
// const ConfigManager = require('./configs');
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // await ConfigManager.initialize();
    const app = (0, express_1.default)();
    const port = 8080;
    // app.set('env', ConfigManager.get("NODE_ENV"));
    const limiter = (0, express_rate_limit_1.rateLimit)({
        windowMs: 30 * 60 * 1000, // 30 minute
        limit: 1000,
        standardHeaders: 'draft-7',
        legacyHeaders: false,
        message: {
            message: 'You\'ve sent out too many requests. Please try again in a while.'
        }
    });
    // Middlewares
    app.use(bodyParser.json());
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)('short'));
    app.use((0, helmet_1.default)());
    // app.use(sanitize.middleware);
    app.use(limiter);
    app.use(samplesRouter_1.default);
    // Test API Call
    app.get('/api/test', (request, response) => {
        response.json({
            message: 'Backend Application working properly.'
        });
    });
    // Error Handling
    app.use((request, response, next) => {
        next((0, http_errors_1.default)(404));
    });
    app.use((error, request, response, next) => {
        console.log(error);
        if (!error.status) {
            const isProduction = app.get('env') === 'prod';
            return response.status(500).json({
                message: isProduction ? 'Internal Server Error' : error.message,
            });
        }
        if (error.status === 400) {
            return response.status(400).json({
                errors: error.message,
            });
        }
        return response.status(error.status).json({
            message: error.message,
        });
    });
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});
startServer().catch(console.error);
