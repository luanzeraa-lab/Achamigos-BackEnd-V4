import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export async function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", async () => {
    const duration = Date.now() - start;

    await logger.info("HTTP Request", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration,
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers
    });
  });

  next();
}