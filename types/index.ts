import { Document } from 'mongoose'

export interface IEndereco {
  cep: string
  rua: string
  cidade: string
  numero: string
}

export interface IUser extends Document {
  nome: string
  cnpj: string
  telefone: string
  userLogin: string
  senha: string
  email: string
  endereco: IEndereco
  linkUser?: string
}

export interface IAnimal extends Document {
  nome: string
  idade?: number
  raca: string
  sexo: string
  porte: string
  peso?: number
  observacoes?: string
  linkAnimal?: string
  castracao: boolean
  imagem?: string
  tipo: string
  userId: string
}

export interface IEvento extends Document {
  nomeEvento?: string
  data: Date
  tipo_Evento?: string
  texto?: string
  linkEvento?: string
  imagem?: string
}
