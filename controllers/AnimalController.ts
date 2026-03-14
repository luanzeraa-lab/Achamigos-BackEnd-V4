import { Request, Response } from 'express'
import * as AnimalModel from '../models/AnimalModel'

export const listarAnimal = async (req: Request, res: Response): Promise<void> => {
  try {
    const animais = await AnimalModel.listarAnimais()
    if (!animais) {
      res.status(404).json({ message: 'Nenhum animal encontrado' })
      return
    }
    res.status(200).json(animais)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const buscarAnimalPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const animal = await AnimalModel.buscarAnimalPorId(id as string)

    if (!animal) {
      res.status(404).json({ message: 'Animal não encontrado' })
      return
    }

    res.status(200).json(animal)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const cadastrarAnimal = async (req: Request, res: Response): Promise<void> => {
  const animalData = { ...req.body }
  try {
    const animalCadastrado = await AnimalModel.cadastrarAnimal(animalData, req.file)
    res.status(201).json(animalCadastrado)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const alterarAnimal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const dados = req.body
    const animalAlterado = await AnimalModel.alterarAnimal(id as string, dados)

    if (!animalAlterado) {
      res.status(404).json({ error: 'Animal não encontrado' })
      return
    }

    res.status(200).json(animalAlterado)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const excluirAnimal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const animalDeletado = await AnimalModel.excluirAnimal(id as string)
    if (!animalDeletado) {
      res.status(400).json({ message: 'Animal não encontrado' })
      return
    }
    res.status(200).json({ message: 'Animal deletado com sucesso' })
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar animal' })
  }
}
