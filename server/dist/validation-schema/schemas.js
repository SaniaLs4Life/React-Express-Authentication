"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.signUpValidationSchema = joi_1.default.object().keys({
    fullname: joi_1.default.string()
        .min(3)
        .max(30)
        .required(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: joi_1.default.string()
        .min(6)
        .max(30)
        .required()
});
exports.signInValidationSchema = joi_1.default.object().keys({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: joi_1.default.string()
        .min(6)
        .max(30)
        .required()
});
//# sourceMappingURL=schemas.js.map