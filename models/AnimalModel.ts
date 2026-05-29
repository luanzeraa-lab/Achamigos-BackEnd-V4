import mongoose, { Schema, Model } from 'mongoose'
import { IAnimal } from '../types'
import { User } from './UserModel';

const AnimalSchema: Schema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: Number },
  raca: { type: String, required: true },
  sexo: { type: String, required: true },
  porte: { type: String, required: true },
  peso: { type: Number },
  observacoes: { type: String },
  linkAnimal: { type: String },
  castracao: { type: Boolean, required: true },
  imagem: { type: String },
  tipo: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Animal: Model<IAnimal> = mongoose.model<IAnimal>('Animal', AnimalSchema)

const listarAnimais = async (): Promise<IAnimal[]> => {
  return await Animal.find()
}

const buscarAnimalPorId = async (id: string): Promise<IAnimal | null> => {
  return await Animal.findById(id)
}

const cadastrarAnimal = async (dados: any, file?: Express.Multer.File): Promise<IAnimal> => {
  const novoAnimal = new Animal({
    ...dados,
    imagem: file ? (file as any).path : null,
  })
  return await novoAnimal.save()
}

const alterarAnimal = async (id: string, dados: any): Promise<IAnimal | null> => {
  return await Animal.findByIdAndUpdate(id, dados, { new: true })
}

const excluirAnimal = async (id: string): Promise<IAnimal | null> => {
  return await Animal.findByIdAndDelete(id)
}




const filtrarAnimais = async (filtros: any = {}): Promise<IAnimal[]> => {
    const { tipo, porte, cidade, castrado, idade } = filtros;
    const query: any = {};

    
    if (cidade) {
        const usuarios = await User.find({ 'endereco.cidade': cidade });
        if (!usuarios.length) return [];
        query.userId = { $in: usuarios.map((user) => user._id) };
    }

    
    if (tipo) query.tipo = tipo;
    if (porte) query.porte = porte;
    if (castrado !== undefined) query.castracao = castrado;
    if (idade) query.idade = idade;

    return await Animal.find(query);
};

export { Animal, cadastrarAnimal, alterarAnimal, excluirAnimal, listarAnimais, buscarAnimalPorId, filtrarAnimais }
