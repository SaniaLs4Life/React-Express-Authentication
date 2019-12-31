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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const schemas_1 = require("../validation-schema/schemas");
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, password } = req.body || {};
    const { error } = schemas_1.signUpValidationSchema.validate({
        fullname,
        email,
        password
    });
    const isExist = yield User_1.default.findOne({ email: email });
    if (isExist)
        return res.status(401).json({ error: true, message: 'This user is already exist!' });
    if (error)
        return res.status(402).json(error.details[0].message);
    const user = new User_1.default({
        fullname,
        email,
        password
    });
    user.password = yield user.encryptPassword(user.password);
    const savedUser = yield user.save();
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id, fullname: user.fullname, email: user.email }, process.env.TOKEN_SECRET || 'tokensecret');
    // res.header('auth-token', token).json(savedUser);
    res.header('auth-token', token).json({ success: true, error: null, token });
});
exports.signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body || {};
    const { error } = schemas_1.signInValidationSchema.validate({ email, password });
    if (error)
        return res.status(403).json(error.details[0].message);
    const user = yield User_1.default.findOne({ email });
    if (!user)
        return res.status(404).json({ error: true, message: 'Email or password is incorrect!' });
    const correctPassword = yield user.validatePassword(password);
    if (!correctPassword)
        return res.status(405).json({ error: true, message: 'Password is incorrect!' });
    const token = jsonwebtoken_1.default.sign({ _id: user._id, fullname: user.fullname, email: user.email }, process.env.TOKEN_SECRET || 'tokensecret', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json({ success: true, err: null, token });
});
exports.profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const user = yield User_1.default.findById(userId, { password: 0 });
    if (!user)
        return res.status(406).json({ error: true, message: 'User not found!' });
    res.json(user);
});
//# sourceMappingURL=auth.controller.js.map