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

  it('lista usuarios com sucesso', async () => {
    const req = {} as any
    const res = createRes()

    listarUserMock.mockResolvedValue([{ id: '1', nome: 'Loja' }] as any)

    await listarUser(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith([{ id: '1', nome: 'Loja' }])
  })

  it('retorna 404 quando nao ha usuarios', async () => {
    const req = {} as any
    const res = createRes()

    listarUserMock.mockResolvedValue(null as any)

    await listarUser(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Nenhum usuário encontrado' })
  })

  it('retorna erro ao listar usuarios', async () => {
    const req = {} as any
    const res = createRes()

    listarUserMock.mockRejectedValue(new Error('erro ao listar'))

    await listarUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'erro ao listar' })
  })

  it('retorna 400 quando campos obrigatorios faltam', async () => {
    const req = { body: { nome: 'Pet Shop' } } as any
    const res = createRes()

    await cadastrarUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Campos obrigatórios não informados' })
  })

  it('retorna 400 quando email ja existe', async () => {
    const req = {
      body: {
        nome: 'Pet Shop',
        cnpj: '12.345.678/0001-99',
        telefone: '11999999999',
        userLogin: 'petshop',
        senha: 'senha123',
        email: 'contato@teste.com',
      },
    } as any
    const res = createRes()

    listarUserMock.mockResolvedValue([
      { email: 'contato@teste.com', userLogin: 'outro' },
    ] as any)

    await cadastrarUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'E-mail já cadastrado' })
  })

  it('retorna 400 quando login ja existe', async () => {
    const req = {
      body: {
        nome: 'Pet Shop',
        cnpj: '12.345.678/0001-99',
        telefone: '11999999999',
        userLogin: 'petshop',
        senha: 'senha123',
        email: 'contato@teste.com',
      },
    } as any
    const res = createRes()

    listarUserMock.mockResolvedValue([
      { email: 'outro@teste.com', userLogin: 'petshop' },
    ] as any)

    await cadastrarUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Login já cadastrado' })
  })

  it('cadastra usuario com sucesso', async () => {
    const req = {
      body: {
        nome: 'Pet Shop',
        cnpj: '12.345.678/0001-99',
        telefone: '11999999999',
        userLogin: 'petshop',
        senha: 'senha123',
        email: 'contato@teste.com',
        endereco: {
          cep: '01310-100',
          rua: 'Avenida Paulista',
          cidade: 'São Paulo',
          numero: '1000',
        },
      },
      file: undefined,
    } as any
    const res = createRes()

    listarUserMock.mockResolvedValue([] as any)
    criarUserMock.mockResolvedValue({
      id: '1',
      nome: 'Pet Shop',
      senha: 'hashed_password',
      __v: 0,
      email: 'contato@teste.com',
    } as any)

    await cadastrarUser(req, res)

    expect(hashSyncMock).toHaveBeenCalledWith('senha123', 10)
    expect(UserModel.criarUser).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: 'Pet Shop',
        cnpj: '12.345.678/0001-99',
        telefone: '11999999999',
        userLogin: 'petshop',
        senha: 'hashed_password',
        email: 'contato@teste.com',
      }),
      undefined
    )
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      id: '1',
      nome: 'Pet Shop',
      email: 'contato@teste.com',
    })
  })

  it('retorna erro ao cadastrar usuario', async () => {
    const req = {
      body: {
        nome: 'Pet Shop',
        cnpj: '12.345.678/0001-99',
        telefone: '11999999999',
        userLogin: 'petshop',
        senha: 'senha123',
        email: 'contato@teste.com',
      },
    } as any
    const res = createRes()

    listarUserMock.mockResolvedValue([] as any)
    criarUserMock.mockRejectedValue(new Error('erro ao criar'))

    await cadastrarUser(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'erro ao criar' })
  })

  it('altera usuario com senha e faz hash', async () => {
    const req = {
      params: { id: '2' },
      body: { nome: 'Atualizado', senha: 'novaSenha' },
    } as any
    const res = createRes()

    alterarUserMock.mockResolvedValue({ id: '2', nome: 'Atualizado' } as any)

    await alterarUser(req, res)

    expect(hashSyncMock).toHaveBeenCalledWith('novaSenha', 10)
    expect(UserModel.alterarUser).toHaveBeenCalledWith('2', {
      nome: 'Atualizado',
      senha: 'hashed_password',
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ id: '2', nome: 'Atualizado' })
  })

  it('altera usuario com senha em branco sem gerar hash', async () => {
    const req = {
      params: { id: '2' },
      body: { nome: 'Atualizado', senha: '   ' },
    } as any
    const res = createRes()

    alterarUserMock.mockResolvedValue({ id: '2', nome: 'Atualizado' } as any)

    await alterarUser(req, res)

    expect(hashSyncMock).not.toHaveBeenCalled()
    expect(UserModel.alterarUser).toHaveBeenCalledWith('2', {
      nome: 'Atualizado',
      senha: '   ',
    })
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it('retorna 400 quando usuario nao e encontrado na alteracao', async () => {
    const req = {
      params: { id: '2' },
      body: { nome: 'Atualizado' },
    } as any
    const res = createRes()

    alterarUserMock.mockResolvedValue(null as any)

    await alterarUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' })
  })

  it('retorna erro ao alterar usuario', async () => {
    const req = {
      params: { id: '2' },
      body: { nome: 'Atualizado' },
    } as any
    const res = createRes()

    alterarUserMock.mockRejectedValue(new Error('erro ao atualizar'))

    await alterarUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'erro ao atualizar' })
  })

  it('exclui usuario com sucesso', async () => {
    const req = { params: { id: '3' } } as any
    const res = createRes()

    excluirUserMock.mockResolvedValue({ id: '3' } as any)

    await excluirUser(req, res)

    expect(UserModel.excluirUser).toHaveBeenCalledWith('3')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ id: '3' })
  })

  it('retorna 400 quando usuario nao e encontrado na exclusao', async () => {
    const req = { params: { id: '3' } } as any
    const res = createRes()

    excluirUserMock.mockResolvedValue(null as any)

    await excluirUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' })
  })

  it('retorna erro ao excluir usuario', async () => {
    const req = { params: { id: '3' } } as any
    const res = createRes()

    excluirUserMock.mockRejectedValue(new Error('erro ao excluir'))

    await excluirUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'erro ao excluir' })
  })
})
