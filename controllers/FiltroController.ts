import { Request, Response } from 'express'
import { filtrarAnimais } from '../models/AnimalModel'

export const filtrar = async (req: Request, res: Response): Promise<void> => {
  try {
    const filtros = req.query

    const animaisFiltrados = await filtrarAnimais(filtros)

    if (!animaisFiltrados || animaisFiltrados.length === 0) {
      res.status(200).json([])
      return
    }

    res.status(200).json(animaisFiltrados)
  } catch (error: any) {
    console.error('Erro ao buscar animais com filtros:', error)
    res.status(500).json({ error: error.message })
  }
}
