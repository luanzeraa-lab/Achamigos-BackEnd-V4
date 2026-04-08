import { Request, Response } from 'express'
import * as AnimalModel from '../models/AnimalModel'
import { logger } from '../utils/logger'

export const listarAnimal = async (req: Request, res: Response): Promise<void> => {
  try {
    const animais = await AnimalModel.listarAnimais()
    if (!animais) {
      logger.info('Nenhum animal encontrado');
      res.status(404).json({ message: 'Nenhum animal encontrado' })
      return
    }
    logger.info('Animais listados com sucesso', { 
      quantidade: animais.length 
    });
    res.status(200).json(animais)
  } catch (error: any) {
    logger.error('Erro ao listar animais', {
      message: error.message,
      stack: error.stack
    });
    res.status(400).json({ error: error.message })
  }
}

export const cadastrarAnimal = async (req: Request, res: Response): Promise<void> => {
  const animalData = { ...req.body }

  try {
    logger.info('Iniciando cadastro de animal', {
      body: animalData
    });

    const animalCadastrado = await AnimalModel.cadastrarAnimal(animalData, req.file)

    logger.info('Animal cadastrado com sucesso', {
      id: animalCadastrado?.id
    });

    res.status(201).json(animalCadastrado)

  } catch (error: any) {
    logger.error('Erro ao cadastrar animal', {
      message: error.message,
      stack: error.stack,
      body: animalData
    });

    res.status(400).json({ error: error.message })
  }
}

export const buscarAnimalPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    logger.info('Buscando animal por ID', { id });

    const animal = await AnimalModel.buscarAnimalPorId(id as string)

    if (!animal) {
      logger.info('Animal não encontrado', { id });
      res.status(404).json({ message: 'Animal não encontrado' })
      return
    }

    logger.info('Animal encontrado com sucesso', { id });

    res.status(200).json(animal)

  } catch (error: any) {
    logger.error('Erro ao buscar animal por ID', {
      message: error.message,
      stack: error.stack,
      params: req.params
    });

    res.status(400).json({ error: error.message })
  }
}
export const alterarAnimal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const dados = req.body

    logger.info('Alterando animal', { id, dados });

    const animalAlterado = await AnimalModel.alterarAnimal(id as string, dados)

    if (!animalAlterado) {
      logger.info('Animal não encontrado para alteração', { id });
      res.status(404).json({ error: 'Animal não encontrado' })
      return
    }

    logger.info('Animal alterado com sucesso', { id });

    res.status(200).json(animalAlterado)

  } catch (error: any) {
    logger.error('Erro ao alterar animal', {
      message: error.message,
      stack: error.stack,
      params: req.params,
      body: req.body
    });

    res.status(400).json({ error: error.message })
  }
}
export const excluirAnimal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    logger.info('Excluindo animal', { id });

    const animalDeletado = await AnimalModel.excluirAnimal(id as string)

    if (!animalDeletado) {
      logger.info('Animal não encontrado para exclusão', { id });
      res.status(400).json({ message: 'Animal não encontrado' })
      return
    }

    logger.info('Animal deletado com sucesso', { id });

    res.status(200).json({ message: 'Animal deletado com sucesso' })

  } catch (error: any) {
    logger.error('Erro ao deletar animal', {
      message: error.message,
      stack: error.stack,
      params: req.params
    });

    res.status(400).json({ error: 'Erro ao deletar animal' })
  }
}