import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { login, listarUser, cadastrarUser, alterarUser, excluirUser } from '../../controllers/UserController'
import * as UserModel from '../../models/UserModel'
import bcrypt from 'bcryptjs'

jest.mock('../../models/UserModel', () => ({
  User: {
    findOne: jest.fn(),
  },
  listarUser: jest.fn(),
  criarUser: jest.fn(),
  alterarUser: jest.fn(),
  excluirUser: jest.fn(),
}))

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn(() => 'hashed_password'),
  compare: jest.fn(),
}))

const createRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as any)

const findOneMock = UserModel.User.findOne as unknown as jest.Mock<any>
const listarUserMock = UserModel.listarUser as jest.MockedFunction<typeof UserModel.listarUser>
const criarUserMock = UserModel.criarUser as jest.MockedFunction<typeof UserModel.criarUser>
const alterarUserMock = UserModel.alterarUser as jest.MockedFunction<typeof UserModel.alterarUser>
const excluirUserMock = UserModel.excluirUser as jest.MockedFunction<typeof UserModel.excluirUser>
const compareMock = bcrypt.compare as unknown as jest.Mock<any>
const hashSyncMock = bcrypt.hashSync as unknown as jest.Mock<any>

describe('UserController', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('retorna erro quando usuario nao e encontrado no login', async () => {
    const req = { body: { email: 'naoexiste@teste.com', senha: '123456' } } as any
    const res = createRes()

    findOneMock.mockResolvedValue(null)

    await login(req, res)

    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Usuário não encontrado',
    })
  })

  it('retorna erro quando a senha esta incorreta', async () => {
    const req = { body: { email: 'user@teste.com', senha: 'senhaerrada' } } as any
    const res = createRes()

    findOneMock.mockResolvedValue({ senha: 'senha_hash', toObject: jest.fn() } as any)
    compareMock.mockResolvedValue(false)

    await login(req, res)

    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Senha ou Email incorretos',
    })
  })

  it('retorna sucesso no login', async () => {
    const userObject = {
      _id: '1',
      nome: 'Pet Shop',
      email: 'user@teste.com',
      senha: 'senha_hash',
    }
    const req = { body: { email: 'user@teste.com', senha: 'senha_certa' } } as any
    const res = createRes()

    findOneMock.mockResolvedValue({ senha: 'senha_hash', toObject: () => userObject } as any)
    compareMock.mockResolvedValue(true)

    await login(req, res)

    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      user: { _id: '1', nome: 'Pet Shop', email: 'user@teste.com' },
      message: 'Login realizado com sucesso',
    })
  })

  it('retorna erro no login quando ocorre excecao', async () => {
    const req = { body: { email: 'user@teste.com', senha: 'senha_certa' } } as any
    const res = createRes()

    findOneMock.mockRejectedValue(new Error('falha no banco'))

    await login(req, res)

    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Erro no servidor',
    })
  })

  it('listar: sucesso, vazio e erro', async () => {
    const req = {} as any
    listarUserMock.mockResolvedValueOnce([{ id: '1', nome: 'Loja' }] as any)
    const res1 = createRes()
    await listarUser(req, res1)
    expect(res1.status).toHaveBeenCalledWith(200)

    listarUserMock.mockResolvedValueOnce(null as any)
    const res2 = createRes()
    await listarUser(req, res2)
    expect(res2.status).toHaveBeenCalledWith(404)

    listarUserMock.mockRejectedValueOnce(new Error('erro'))
    const res3 = createRes()
    await listarUser(req, res3)
    expect(res3.status).toHaveBeenCalledWith(400)
  })

  it('cadastro: validações e erro', async () => {
    const req1 = { body: { nome: 'Pet Shop' } } as any
    const res1 = createRes()
    await cadastrarUser(req1, res1)
    expect(res1.status).toHaveBeenCalledWith(400)

    const body = { nome: 'Pet Shop', cnpj: '12.345.678/0001-99', telefone: '11999999999', userLogin: 'petshop', senha: 'senha123', email: 'contato@teste.com' }
    listarUserMock.mockResolvedValueOnce([{ email: 'contato@teste.com', userLogin: 'outro' }] as any)
    const req2 = { body } as any
    const res2 = createRes()
    await cadastrarUser(req2, res2)
    expect(res2.status).toHaveBeenCalledWith(400)

    listarUserMock.mockResolvedValueOnce([{ email: 'outro@teste.com', userLogin: 'petshop' }] as any)
    const req3 = { body } as any
    const res3 = createRes()
    await cadastrarUser(req3, res3)
    expect(res3.status).toHaveBeenCalledWith(400)
  })

  it('cadastro sucesso e erro', async () => {
    listarUserMock.mockResolvedValueOnce([] as any)
    criarUserMock.mockResolvedValueOnce({ id: '1', nome: 'Pet Shop', email: 'contato@teste.com' } as any)
    const req1 = { body: { nome: 'Pet Shop', cnpj: '12.345.678/0001-99', telefone: '11999999999', userLogin: 'petshop', senha: 'senha123', email: 'contato@teste.com' }, file: undefined } as any
    const res1 = createRes()
    await cadastrarUser(req1, res1)
    expect(res1.status).toHaveBeenCalledWith(201)

    listarUserMock.mockResolvedValueOnce([] as any)
    criarUserMock.mockRejectedValueOnce(new Error('erro'))
    const res2 = createRes()
    await cadastrarUser(req1, res2)
    expect(res2.status).toHaveBeenCalledWith(500)
  })

  it('alterar: com hash, vazio, vazio e erro', async () => {
    alterarUserMock.mockResolvedValueOnce({ id: '2', nome: 'Atualizado' } as any)
    const req1 = { params: { id: '2' }, body: { nome: 'Atualizado', senha: 'novaSenha' } } as any
    const res1 = createRes()
    await alterarUser(req1, res1)
    expect(res1.status).toHaveBeenCalledWith(200)

    alterarUserMock.mockResolvedValueOnce({ id: '2', nome: 'Atualizado' } as any)
    const req2 = { params: { id: '2' }, body: { nome: 'Atualizado', senha: '   ' } } as any
    const res2 = createRes()
    await alterarUser(req2, res2)
    expect(res2.status).toHaveBeenCalledWith(200)

    alterarUserMock.mockResolvedValueOnce(null as any)
    const req3 = { params: { id: '2' }, body: { nome: 'Atualizado' } } as any
    const res3 = createRes()
    await alterarUser(req3, res3)
    expect(res3.status).toHaveBeenCalledWith(400)

    alterarUserMock.mockRejectedValueOnce(new Error('erro'))
    const res4 = createRes()
    await alterarUser(req3, res4)
    expect(res4.status).toHaveBeenCalledWith(400)
  })

  it('excluir: sucesso, vazio e erro', async () => {
    const req = { params: { id: '3' } } as any
    excluirUserMock.mockResolvedValueOnce({ id: '3' } as any)
    const res1 = createRes()
    await excluirUser(req, res1)
    expect(res1.status).toHaveBeenCalledWith(200)

    excluirUserMock.mockResolvedValueOnce(null as any)
    const res2 = createRes()
    await excluirUser(req, res2)
    expect(res2.status).toHaveBeenCalledWith(400)

    excluirUserMock.mockRejectedValueOnce(new Error('erro'))
    const res3 = createRes()
    await excluirUser(req, res3)
    expect(res3.status).toHaveBeenCalledWith(400)
  })
})
