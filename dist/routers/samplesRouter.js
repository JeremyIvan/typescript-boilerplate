"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const samplesControllers_1 = __importDefault(require("../controllers/samplesControllers"));
const samplesRouter = (0, express_1.Router)();
samplesRouter.post('/sample', samplesControllers_1.default.sampleFunction);
exports.default = samplesRouter;
