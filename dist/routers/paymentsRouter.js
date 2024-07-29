"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentsControllers_1 = __importDefault(require("../controllers/paymentsControllers"));
const paymentsRouter = (0, express_1.Router)();
paymentsRouter.post('/sample', paymentsControllers_1.default.sampleFunction);
exports.default = paymentsRouter;
