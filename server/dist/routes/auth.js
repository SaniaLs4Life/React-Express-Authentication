"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const verifyToken_1 = require("../utils/verifyToken");
const router = express_1.Router();
router.post('/signup', auth_controller_1.signUp);
router.post('/signin', auth_controller_1.signIn);
router.get('/profile', verifyToken_1.TokenValidation, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map