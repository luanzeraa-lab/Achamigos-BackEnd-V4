import { Animal } from '../models/AnimalModel';
import { User } from '../models/UserModel';
import { IAnimal } from '../types';

interface FiltrosQuery {
  tipo?: string;
  porte?: string;
  cidade?: string;
  castrado?: string;
  idade?: string;
}

class FiltroService {
  static async filtrarAnimais(filtros: any = {}): Promise<IAnimal[]> {
    const { tipo, porte, cidade, castrado, idade } = filtros as FiltrosQuery;
    let userIDs: any = null;
    const animaisFiltrados: any = {};

    if (cidade) {
      const usuarios = await User.find({ 'endereco.cidade': cidade });
      if (!usuarios.length) {
        return [];
      }
      userIDs = usuarios.map(user => user._id);
      animaisFiltrados.userId = { $in: userIDs };
    }

    if (tipo) {
      animaisFiltrados.tipo = tipo;
    }
    if (porte) {
      animaisFiltrados.porte = porte;
    }
    if (castrado !== undefined) {
      animaisFiltrados.castracao = castrado;
    }
    if (idade) {
      animaisFiltrados.idade = idade;
    }

    const animais = await Animal.find(animaisFiltrados);
    return animais;
  }
}

export default FiltroService;
