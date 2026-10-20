"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthConfig = void 0;
exports.AuthConfig = {
    jwt: {
        secret: process.env.JWT_SECRET || "default_secret_key",
        expiresIn: "1d"
    }
};
//# sourceMappingURL=Auth.js.map