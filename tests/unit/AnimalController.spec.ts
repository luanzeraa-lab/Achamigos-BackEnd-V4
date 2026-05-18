import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { listarAnimal, cadastrarAnimal, buscarAnimalPorId, alterarAnimal, excluirAnimal } from '../../controllers/AnimalController'
import * as AnimalModel from '../../models/AnimalModel'

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

const createRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as any)

const listarAnimaisMock = AnimalModel.listarAnimais as jest.MockedFunction<typeof AnimalModel.listarAnimais>
const buscarAnimalPorIdMock = AnimalModel.buscarAnimalPorId as jest.MockedFunction<typeof AnimalModel.buscarAnimalPorId>
const cadastrarAnimalMock = AnimalModel.cadastrarAnimal as jest.MockedFunction<typeof AnimalModel.cadastrarAnimal>
const alterarAnimalMock = AnimalModel.alterarAnimal as jest.MockedFunction<typeof AnimalModel.alterarAnimal>
const excluirAnimalMock = AnimalModel.excluirAnimal as jest.MockedFunction<typeof AnimalModel.excluirAnimal>

describe('AnimalController', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('lista animais com sucesso', async () => {
    const req = {} as any
    const res = createRes()

    listarAnimaisMock.mockResolvedValue([{ id: '1', nome: 'Rex' }] as any)

    await listarAnimal(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith([{ id: '1', nome: 'Rex' }])
  })

  it('retorna 404 quando nao ha animais', async () => {
    const req = {} as any
    const res = createRes()

    listarAnimaisMock.mockResolvedValue(null as any)

    await listarAnimal(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Nenhum animal encontrado' })
  })

  it('retorna erro ao listar animais', async () => {
    const req = {} as any
    const res = createRes()

    listarAnimaisMock.mockRejectedValue(new Error('falha na lista'))

    await listarAnimal(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'falha na lista' })
  })

  it('cadastra animal com sucesso', async () => {
    const req = {
      body: { nome: 'Mel', raca: 'SRD' },
      file: undefined,
    } as any
    const res = createRes()

    cadastrarAnimalMock.mockResolvedValue({ id: '10', nome: 'Mel', raca: 'SRD' } as any)

    await cadastrarAnimal(req, res)

    expect(AnimalModel.cadastrarAnimal).toHaveBeenCalledWith({ nome: 'Mel', raca: 'SRD' }, undefined)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ id: '10', nome: 'Mel', raca: 'SRD' })
  })

  it('retorna erro ao cadastrar animal', async () => {
    const req = {
      body: { nome: 'Mel', raca: 'SRD' },
      file: undefined,
    } as any
    const res = createRes()

    cadastrarAnimalMock.mockRejectedValue(new Error('erro ao salvar'))

    await cadastrarAnimal(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'erro ao salvar' })
  })

  it('busca animal por id com sucesso', async () => {
    const req = { params: { id: '123' } } as any
    const res = createRes()

    buscarAnimalPorIdMock.mockResolvedValue({ id: '123', nome: 'Lua' } as any)

    await buscarAnimalPorId(req, res)

    expect(AnimalModel.buscarAnimalPorId).toHaveBeenCalledWith('123')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ id: '123', nome: 'Lua' })
  })

  it('retorna 404 quando animal nao e encontrado', async () => {
    const req = { params: { id: '123' } } as any
    const res = createRes()

    buscarAnimalPorIdMock.mockResolvedValue(null as any)

    await buscarAnimalPorId(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Animal não encontrado' })
  })

  it('retorna erro ao buscar animal por id', async () => {
    const req = { params: { id: '123' } } as any
    const res = createRes()

    buscarAnimalPorIdMock.mockRejectedValue(new Error('erro na busca'))

    await buscarAnimalPorId(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'erro na busca' })
  })

  it('altera animal com sucesso', async () => {
    const req = { params: { id: '456' }, body: { nome: 'Thor' } } as any
    const res = createRes()

    alterarAnimalMock.mockResolvedValue({ id: '456', nome: 'Thor' } as any)

    await alterarAnimal(req, res)

    expect(AnimalModel.alterarAnimal).toHaveBeenCalledWith('456', { nome: 'Thor' })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ id: '456', nome: 'Thor' })
  })

  it('retorna 404 quando nao encontra animal para alteracao', async () => {
    const req = { params: { id: '456' }, body: { nome: 'Thor' } } as any
    const res = createRes()

    alterarAnimalMock.mockResolvedValue(null as any)

    await alterarAnimal(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: 'Animal não encontrado' })
  })

  it('retorna erro ao alterar animal', async () => {
    const req = { params: { id: '456' }, body: { nome: 'Thor' } } as any
    const res = createRes()

    alterarAnimalMock.mockRejectedValue(new Error('erro ao atualizar'))

    await alterarAnimal(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'erro ao atualizar' })
  })

  it('exclui animal com sucesso', async () => {
    const req = { params: { id: '789' } } as any
    const res = createRes()

    excluirAnimalMock.mockResolvedValue({ id: '789' } as any)

    await excluirAnimal(req, res)

    expect(AnimalModel.excluirAnimal).toHaveBeenCalledWith('789')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Animal deletado com sucesso' })
  })

  it('retorna 400 quando nao encontra animal para exclusao', async () => {
    const req = { params: { id: '789' } } as any
    const res = createRes()

    excluirAnimalMock.mockResolvedValue(null as any)

    await excluirAnimal(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Animal não encontrado' })
  })

  it('retorna erro ao excluir animal', async () => {
    const req = { params: { id: '789' } } as any
    const res = createRes()

    excluirAnimalMock.mockRejectedValue(new Error('erro ao deletar'))

    await excluirAnimal(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao deletar animal' })
  })
})
