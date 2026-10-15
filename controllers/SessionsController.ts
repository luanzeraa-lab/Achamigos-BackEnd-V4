import { Request, Response } from "express";
import { z } from "zod"
import { compare } from "bcrypt";
import { AuthConfig } from "../config/Auth";
import { User } from "../models/UserModel";
import { sign } from "jsonwebtoken";

class sessionsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            email: z.email({ message: "Email inválido." }),
            password: z.string({ message: 'Senha é obrigatória' }).min(1, 'Senha não pode estar vazia'),
        });

        const { email, password } = bodySchema.parse(request.body)

        const user = await User.findOne({ email })
        
        if (!user) {
            throw new Error("E-mail ou senha inválido")
        }

        const passwordMatched = await compare(password, user.senha)

        if (!passwordMatched) {
            throw new Error("E-mail ou senha inválido")
        }

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