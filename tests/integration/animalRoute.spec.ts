import express from 'express'
import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals'

import apiKeyAuth from '../../middleware/apiKeyAuth'
import animalRoute from '../../routes/AnimalRoute'
import * as AnimalModel from '../../models/AnimalModel'
import type { IAnimal } from '../../types'

jest.mock('../../models/AnimalModel', () => ({
  listarAnimais: jest.fn(),
  buscarAnimalPorId: jest.fn(),
  cadastrarAnimal: jest.fn(),
  alterarAnimal: jest.fn(),
  excluirAnimal: jest.fn(),
}))

jest.mock('../../utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}))

const listarAnimaisMock = AnimalModel.listarAnimais as jest.MockedFunction<
  typeof AnimalModel.listarAnimais
>
const buscarAnimalPorIdMock = AnimalModel.buscarAnimalPorId as jest.MockedFunction<
  typeof AnimalModel.buscarAnimalPorId
>
const cadastrarAnimalMock = AnimalModel.cadastrarAnimal as jest.MockedFunction<
  typeof AnimalModel.cadastrarAnimal
>
const alterarAnimalMock = AnimalModel.alterarAnimal as jest.MockedFunction<
  typeof AnimalModel.alterarAnimal
>
const excluirAnimalMock = AnimalModel.excluirAnimal as jest.MockedFunction<
  typeof AnimalModel.excluirAnimal
>

describe('Animal integration tests', () => {
  const apiKey = 'test-api-key'

  beforeAll(() => {
    process.env.API_KEY = apiKey
  })

  const createApp = () => {
    const app = express()

    app.use(express.json())
    app.use(apiKeyAuth)
    app.use('/api', animalRoute)

    return app
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve listar animais na rota GET /api/animais', async () => {
    const animais = [
      {
        id: '1',
        nome: 'Rex',
        raca: 'Vira-lata',
      } as unknown as IAnimal,
    ] as IAnimal[]

    listarAnimaisMock.mockResolvedValue(animais)

    const response = await request(createApp())
      .get('/api/animais')
      .set('x-api-key', apiKey)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(animais)
    expect(AnimalModel.listarAnimais).toHaveBeenCalledTimes(1)
  })

  it('deve buscar um animal na rota GET /api/animais/:id', async () => {
    const animal = {
      id: '123',
      nome: 'Lua',
      raca: 'SRD',
    } as unknown as IAnimal

    buscarAnimalPorIdMock.mockResolvedValue(animal)

    const response = await request(createApp())
      .get('/api/animais/123')
      .set('x-api-key', apiKey)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(animal)
    expect(AnimalModel.buscarAnimalPorId).toHaveBeenCalledWith('123')
  })

  it('deve cadastrar um animal na rota POST /api/animais', async () => {
    const novoAnimal = {
      id: '321',
      nome: 'Mel',
      raca: 'Poodle',
    } as unknown as IAnimal

    cadastrarAnimalMock.mockResolvedValue(novoAnimal)

    const response = await request(createApp())
      .post('/api/animais')
      .set('x-api-key', apiKey)
      .send({
        nome: 'Mel',
        raca: 'Poodle',
        sexo: 'Fêmea',
        porte: 'Pequeno',
        castracao: true,
        tipo: 'Cachorro',
        userId: 'user-1',
      })

    expect(response.status).toBe(201)
    expect(response.body).toEqual(novoAnimal)
    expect(AnimalModel.cadastrarAnimal).toHaveBeenCalledTimes(1)
    expect(AnimalModel.cadastrarAnimal).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: 'Mel',
        raca: 'Poodle',
        sexo: 'Fêmea',
        porte: 'Pequeno',
        castracao: true,
        tipo: 'Cachorro',
        userId: 'user-1',
      }),
      undefined
    )
  })

  it('deve alterar um animal na rota PUT /api/animais/:id', async () => {
    const animalAtualizado = {
      id: '456',
      nome: 'Thor',
      raca: 'Labrador',
    } as unknown as IAnimal

    alterarAnimalMock.mockResolvedValue(animalAtualizado)

    const response = await request(createApp())
      .put('/api/animais/456')
      .set('x-api-key', apiKey)
      .send({
        nome: 'Thor',
        raca: 'Labrador',
      })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(animalAtualizado)
    expect(AnimalModel.alterarAnimal).toHaveBeenCalledWith('456', {
      nome: 'Thor',
      raca: 'Labrador',
    })
  })

  it('deve excluir um animal na rota DELETE /api/animais/:id', async () => {
    excluirAnimalMock.mockResolvedValue({
      id: '789',
    } as unknown as IAnimal)

    const response = await request(createApp())
      .delete('/api/animais/789')
      .set('x-api-key', apiKey)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Animal deletado com sucesso' })
    expect(AnimalModel.excluirAnimal).toHaveBeenCalledWith('789')
  })
})