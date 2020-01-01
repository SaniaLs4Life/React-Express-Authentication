"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const app = express_1.default();
//SETTINGS
app.set('port', 4000);
// MIDDLEWARES
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(cors_1.default({ credentials: true, origin: true }));
//ROUTES
app.use('/auth', auth_1.default);
app.use('/', user_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map