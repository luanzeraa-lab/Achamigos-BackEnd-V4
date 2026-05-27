import { Model } from 'mongoose';
import { IUser } from '../types';
declare const User: Model<IUser>;
declare const listarUser: () => Promise<IUser[]>;
declare const criarUser: (dados: any, file?: Express.Multer.File) => Promise<IUser>;
declare const alterarUser: (id: string, dados: any) => Promise<IUser | null>;
declare const excluirUser: (id: string) => Promise<IUser | null>;
export { User, criarUser, listarUser, alterarUser, excluirUser };
export declare function cadastrarUser(): void;
//# sourceMappingURL=UserModel.d.ts.map