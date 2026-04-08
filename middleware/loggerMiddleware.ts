import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export async function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info("HTTP Request", {
      type: "http_request",
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: duration,
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers
    });
  });

  next();
}