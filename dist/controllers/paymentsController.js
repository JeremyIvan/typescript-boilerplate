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
exports.paymentsController = void 0;
const paymentsServices_1 = require("../services/paymentsServices");
exports.paymentsController = {
    sampleFunction: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const { message, age, test } = request.body;
        if (!message) {
            throw Error('no message found');
            return;
        }
        const { status, result } = yield paymentsServices_1.paymentServices.sampleService(message);
        response.status(status).json(result);
    })
};
