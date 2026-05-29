import { Request, Response } from 'express';
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const listarUser: (req: Request, res: Response) => Promise<void>;
export declare const cadastrarUser: (req: Request, res: Response) => Promise<void>;
export declare const alterarUser: (req: Request, res: Response) => Promise<void>;
export declare const excluirUser: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=UserController.d.ts.map