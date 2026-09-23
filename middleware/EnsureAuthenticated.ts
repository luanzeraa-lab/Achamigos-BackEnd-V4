import { NextFunction, Request, Response } from "express";
import { AuthConfig } from "../config/Auth";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  sub: string;
  role: string;
}

function ensureAuthenticated(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Token JWT não encontrado.");
    }

    const [, token] = authHeader.split(" ");

    const { role, sub: user_id } = verify(
      token,
      AuthConfig.jwt.secret,
    ) as TokenPayload;

    req.user = {
      _id: user_id,
      role
    };

    return next();
  } catch (_error) {
    throw new Error("Token JWT não encontrado.");
  }
}

export { ensureAuthenticated };