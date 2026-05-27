"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('>>> Middleware apiKeyAuth carregado!');
const apiKeyAuth = (req, res, next) => {
    if (req.path.startsWith('/docs') || req.path.startsWith('/public')) {
        return next();
    }
    const apiKey = req.header('x-api-key');
    console.log('API Key recebida:', apiKey);
    console.log('API Key esperada:', process.env.API_KEY);
    if (!apiKey || apiKey !== process.env.API_KEY) {
        res.status(403).json({ message: 'Api Key inválida ou ausente' });
        return;
    }
    next();
};
exports.default = apiKeyAuth;
//# sourceMappingURL=apiKeyAuth.js.map