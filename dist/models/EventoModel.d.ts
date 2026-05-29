import { Model } from 'mongoose';
import { IEvento } from '../types';
declare const Evento: Model<IEvento>;
declare const listarEvento: () => Promise<IEvento[]>;
declare const cadastrarEvento: (dados: any, file?: Express.Multer.File) => Promise<IEvento>;
declare const alterarEvento: (id: string, dados: any) => Promise<IEvento | null>;
declare const excluirEvento: (id: string) => Promise<IEvento | null>;
export { Evento, listarEvento, cadastrarEvento, alterarEvento, excluirEvento };
//# sourceMappingURL=EventoModel.d.ts.map