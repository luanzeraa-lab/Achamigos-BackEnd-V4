import mongoose, { Schema, Model } from 'mongoose';
import { IUser, IEndereco } from '../types';

const EnderecoSchema: Schema = new mongoose.Schema({
  cep: { type: String, required: true },
  rua: { type: String, required: true },
  cidade: { type: String, required: true },
  numero: { type: String, required: true }
});

const UserSchema: Schema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnpj: { type: String, required: true },
  telefone: { type: String, required: true },
  userLogin: { type: String, required: true },
  senha: { type: String, required: true },
  email: { type: String, required: true },
  endereco: EnderecoSchema,
  linkUser: { type: String }
});

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

const listarUser = async (): Promise<IUser[]> => {
  return await User.find();
};

const alterarUser = async (id: string, dados: any): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    id,
    dados,
    { new: true }
  );
};

const excluirUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

export { User, listarUser, alterarUser, excluirUser };
