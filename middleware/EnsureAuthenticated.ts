/// <reference path="../types/express.d.ts" />

import { NextFunction, Request, Response } from "express";
import { AuthConfig } from "../config/Auth";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  sub: string;
  role?: string;
}

function ensureAuthenticated(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Token JWT ausente.");
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new Error("Formato do token JWT inválido.");
    }

    const { role, sub: user_id } = verify(
      token,
      AuthConfig.jwt.secret,
    ) as TokenPayload;

    req.user = {
      _id: user_id,
      role: role ?? ""
    };

    return next();
  } catch (_error) {
    return _res.status(401).json({
      message: "Token JWT inválido ou ausente."
    });
  }
}

export { ensureAuthenticated };