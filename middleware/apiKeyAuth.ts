import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

console.log(">>> Middleware apiKeyAuth carregado!");

const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (
    req.path.startsWith('/docs') ||
    req.path.startsWith('/public')
  ) {
    return next();
  }

  const apiKey = req.header('x-api-key');

  console.log('API Key recebida:', apiKey);
  console.log('API Key esperada:', process.env.API_KEY);

  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(403).json({ message: 'Api Key inválida ou ausente' });
    return;
  }

  next();
};

export default apiKeyAuth;
