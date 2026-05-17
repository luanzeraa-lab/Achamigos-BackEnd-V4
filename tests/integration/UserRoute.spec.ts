import express from 'express'
import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals'
 
import apiKeyAuth from '../../middleware/apiKeyAuth'
import userRoute from '../../routes/UserRoute'
import * as UserModel from '../../models/UserModel'
import type { IUser } from '../../types'
 
jest.mock('../../models/UserModel', () => ({
  listarUser: jest.fn(),
  criarUser: jest.fn(),
  alterarUser: jest.fn(),
  excluirUser: jest.fn(),
}))
 
jest.mock('../../utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}))

const listarUserMock = UserModel.listarUser as jest.MockedFunction<
  typeof UserModel.listarUser
>
const criarUserMock = UserModel.criarUser as jest.MockedFunction<
  typeof UserModel.criarUser
>
const alterarUserMock = UserModel.alterarUser as jest.MockedFunction<
  typeof UserModel.alterarUser
>
const excluirUserMock = UserModel.excluirUser as jest.MockedFunction<
  typeof UserModel.excluirUser
>
 
describe('User integration tests', () => {
  const apiKey = 'test-api-key'
 
  beforeAll(() => {
    process.env.API_KEY = apiKey
  })
 
  const createApp = () => {
    const app = express()
 
    app.use(express.json())
    app.use(apiKeyAuth)
    app.use('/api', userRoute)
 
    return app
  }
 
  beforeEach(() => {
    jest.clearAllMocks()
  })

   it('deve listar users na rota GET /api/users', async () => {
    const users = [
      {
        id: '1',
        nome: 'Pet Shop Central',
        cnpj: '12.345.678/0001-99',
        email: 'contato@petshop.com',
      } as unknown as IUser,
    ] as IUser[]
 
    listarUserMock.mockResolvedValue(users)
 
    const response = await request(createApp())
      .get('/api/users')
      .set('x-api-key', apiKey)
 
    expect(response.status).toBe(200)
    expect(response.body).toEqual(users)
    expect(UserModel.listarUser).toHaveBeenCalledTimes(1)
  })
 




  it('deve cadastrar um user na rota POST /api/users', async () => {
    const novoUser = {
      id: '321',
      nome: 'Pet Shop Norte',
      cnpj: '98.765.432/0001-11',
      telefone: '11999999999',
      userLogin: 'petshopmorth',
      email: 'norte@petshop.com',
      endereco: {
        cep: '01310-100',
        rua: 'Avenida Paulista',
        cidade: 'São Paulo',
        numero: '1000',
      },
    } as unknown as IUser
 
    const response = await request(createApp())
      .post('/api/users')
      .set('x-api-key', apiKey)
      .send({
        nome: 'Pet Shop Norte',
        cnpj: '98.765.432/0001-11',
        telefone: '11999999999',
        userLogin: 'petshopnorte',
        senha: 'senha123',
        email: 'norte@petshop.com',
        endereco: {
          cep: '01310-100',
          rua: 'Avenida Paulista',
          cidade: 'São Paulo',
          numero: '1000',
        },
      })
 
    expect(response.status).toBe(201)
    expect(UserModel.criarUser).toHaveBeenCalledTimes(1)
    expect(UserModel.criarUser).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: 'Pet Shop Norte',
        cnpj: '98.765.432/0001-11',
        telefone: '11999999999',
        email: 'norte@petshop.com',
        senha: 'hashed_password',
      }),
      undefined
    )
  })


  it('deve alterar um user na rota PUT /api/users/:id', async () => {
    const userAtualizado = {
      id: '456',
      nome: 'Pet Shop Atualizado',
      telefone: '11666666666',
    } as unknown as IUser
 
    alterarUserMock.mockResolvedValue(userAtualizado)
 
    const response = await request(createApp())
      .put('/api/users/456')
      .set('x-api-key', apiKey)
      .send({
        nome: 'Pet Shop Atualizado',
        telefone: '11666666666',
      })
 
    expect(response.status).toBe(200)
    expect(response.body).toEqual(userAtualizado)
    expect(UserModel.alterarUser).toHaveBeenCalledWith('456', {
      nome: 'Pet Shop Atualizado',
      telefone: '11666666666',
    })
  })


  it('deve excluir um user na rota DELETE /api/users/:id', async () => {
    excluirUserMock.mockResolvedValue({
      id: '1',
    } as unknown as IUser)
 
    const response = await request(createApp())
      .delete('/api/users/1')
      .set('x-api-key', apiKey)
 
    expect(response.status).toBe(200)
    expect(UserModel.excluirUser).toHaveBeenCalledWith('1')
  })


})
