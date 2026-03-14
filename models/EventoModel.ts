import mongoose, { Schema, Model } from 'mongoose'
import { IEvento } from '../types'

const EventoSchema: Schema = new mongoose.Schema({
  nomeEvento: { type: String, required: false },
  data: { type: Date, default: Date.now },
  tipo_Evento: { type: String },
  texto: { type: String },
  linkEvento: { type: String },
  imagem: { type: String },
})

const Evento: Model<IEvento> = mongoose.model<IEvento>('Evento', EventoSchema)

const listarEvento = async (): Promise<IEvento[]> => {
  return await Evento.find()
}

const cadastrarEvento = async (dados: any, file?: Express.Multer.File): Promise<IEvento> => {
  const newEvento = new Evento({
    tipo_Evento: dados.tipo_Evento,
    texto: dados.texto,
    data: dados.data,
    linkEvento: dados.linkEvento,
    nomeEvento: dados.nomeEvento || dados.tipo_Evento,
    imagem: file ? `/public/${file.filename}` : null,
  })

  return await newEvento.save()
}

const alterarEvento = async (id: string, dados: any): Promise<IEvento | null> => {
  return await Evento.findByIdAndUpdate(id, dados, { new: true })
}

const excluirEvento = async (id: string): Promise<IEvento | null> => {
  return await Evento.findByIdAndDelete(id)
}

export { Evento, listarEvento, cadastrarEvento, alterarEvento, excluirEvento }
