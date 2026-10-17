import { Request, Response } from "express";
import { z } from "zod"
import { compare } from "bcrypt";
import { AuthConfig } from "../config/Auth";
import { User } from "../models/UserModel";
import { sign } from "jsonwebtoken";
import {
    checkLoginAllowed,
    loginRateLimitResponse,
    registerFailedLogin,
    registerSuccessfulLogin,
} from "../middleware/loginSecurity";

class sessionsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            email: z.email({ message: "Email inválido." }),
            password: z.string({ message: 'Senha é obrigatória' }).min(1, 'Senha não pode estar vazia'),
        });

        const { email, password } = bodySchema.parse(request.body)

        const security = checkLoginAllowed(email)
        if (!security.allowed) {
            return loginRateLimitResponse(response, security.retryAfterSeconds!)
        }

        const user = await User.findOne({ email })
        
        if (!user) {
            registerFailedLogin(email)
            throw new Error("E-mail ou senha inválido")
        }

        const passwordMatched = await compare(password, user.senha)

        if (!passwordMatched) {
            registerFailedLogin(email)
            throw new Error("E-mail ou senha inválido")
        }

        registerSuccessfulLogin(email)
        const { secret, expiresIn } = AuthConfig.jwt
        
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        })

        const { senha: _hashedPassword, ...userWithoutPassword } = user.toObject()

        response.json({token, user: userWithoutPassword})
    }
}

export { sessionsController }