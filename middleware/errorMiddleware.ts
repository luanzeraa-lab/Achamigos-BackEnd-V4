import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error("Erro não tratado", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl
  });

  res.status(500).json({
    message: "Erro interno do servidor"
  });
}