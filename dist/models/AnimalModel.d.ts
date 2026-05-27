import { Model } from 'mongoose';
import { IAnimal } from '../types';
declare const Animal: Model<IAnimal>;
declare const listarAnimais: () => Promise<IAnimal[]>;
declare const buscarAnimalPorId: (id: string) => Promise<IAnimal | null>;
declare const cadastrarAnimal: (dados: any, file?: Express.Multer.File) => Promise<IAnimal>;
declare const alterarAnimal: (id: string, dados: any) => Promise<IAnimal | null>;
declare const excluirAnimal: (id: string) => Promise<IAnimal | null>;
declare const filtrarAnimais: (filtros?: any) => Promise<IAnimal[]>;
export { Animal, cadastrarAnimal, alterarAnimal, excluirAnimal, listarAnimais, buscarAnimalPorId, filtrarAnimais };
//# sourceMappingURL=AnimalModel.d.ts.map