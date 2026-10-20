import { NextFunction, Request, Response } from "express";
declare function ensureAuthenticated(req: Request, _res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
export { ensureAuthenticated };
//# sourceMappingURL=EnsureAuthenticated.d.ts.map