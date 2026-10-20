"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = ensureAuthenticated;
const Auth_1 = require("../config/Auth");
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(req, _res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error("Token JWT ausente.");
        }
        const [scheme, token] = authHeader.split(" ");
        if (scheme !== "Bearer" || !token) {
            throw new Error("Formato do token JWT inválido.");
        }
        const { role, sub: user_id } = (0, jsonwebtoken_1.verify)(token, Auth_1.AuthConfig.jwt.secret);
        req.user = {
            _id: user_id,
            role: role ?? ""
        };
        return next();
    }
    catch (_error) {
        return _res.status(401).json({
            message: "Token JWT inválido ou ausente."
        });
    }
}
//# sourceMappingURL=EnsureAuthenticated.js.map