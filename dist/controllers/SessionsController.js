"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsController = void 0;
const zod_1 = require("zod");
const bcrypt_1 = require("bcrypt");
const Auth_1 = require("../config/Auth");
const UserModel_1 = require("../models/UserModel");
const jsonwebtoken_1 = require("jsonwebtoken");
const loginSecurity_1 = require("../middleware/loginSecurity");
class sessionsController {
    async create(request, response) {
        const bodySchema = zod_1.z.object({
            email: zod_1.z.email({ message: "Email inválido." }),
            password: zod_1.z.string({ message: 'Senha é obrigatória' }).min(1, 'Senha não pode estar vazia'),
        });
        const { email, password } = bodySchema.parse(request.body);
        const security = (0, loginSecurity_1.checkLoginAllowed)(email);
        if (!security.allowed) {
            return (0, loginSecurity_1.loginRateLimitResponse)(response, security.retryAfterSeconds);
        }
        const user = await UserModel_1.User.findOne({ email });
        if (!user) {
            (0, loginSecurity_1.registerFailedLogin)(email);
            throw new Error("E-mail ou senha inválido");
        }
        const passwordMatched = await (0, bcrypt_1.compare)(password, user.senha);
        if (!passwordMatched) {
            (0, loginSecurity_1.registerFailedLogin)(email);
            throw new Error("E-mail ou senha inválido");
        }
        (0, loginSecurity_1.registerSuccessfulLogin)(email);
        const { secret, expiresIn } = Auth_1.AuthConfig.jwt;
        const token = (0, jsonwebtoken_1.sign)({}, secret, {
            subject: user.id,
            expiresIn
        });
        const { senha: _hashedPassword, ...userWithoutPassword } = user.toObject();
        response.json({ token, user: userWithoutPassword });
    }
}
exports.sessionsController = sessionsController;
//# sourceMappingURL=SessionsController.js.map