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

  it('listar: sucesso, vazio e erro', async () => {
    const req = {} as any
    listarAnimaisMock.mockResolvedValueOnce([{ id: '1', nome: 'Rex' }] as any)
    const res1 = createRes()
    await listarAnimal(req, res1)
    expect(res1.status).toHaveBeenCalledWith(200)
    expect(res1.json).toHaveBeenCalledWith([{ id: '1', nome: 'Rex' }])

    listarAnimaisMock.mockResolvedValueOnce(null as any)
    const res2 = createRes()
    await listarAnimal(req, res2)
    expect(res2.status).toHaveBeenCalledWith(404)

    listarAnimaisMock.mockRejectedValueOnce(new Error('falha'))
    const res3 = createRes()
    await listarAnimal(req, res3)
    expect(res3.status).toHaveBeenCalledWith(400)
  })

  it('cadastrar: sucesso e erro', async () => {
    const req = { body: { nome: 'Mel', raca: 'SRD' }, file: undefined } as any
    cadastrarAnimalMock.mockResolvedValueOnce({ id: '10', nome: 'Mel', raca: 'SRD' } as any)
    const res1 = createRes()
    await cadastrarAnimal(req, res1)
    expect(res1.status).toHaveBeenCalledWith(201)

    cadastrarAnimalMock.mockRejectedValueOnce(new Error('erro'))
    const res2 = createRes()
    await cadastrarAnimal(req, res2)
    expect(res2.status).toHaveBeenCalledWith(400)
  })

  it('buscar: sucesso, vazio e erro', async () => {
    const req = { params: { id: '123' } } as any
    buscarAnimalPorIdMock.mockResolvedValueOnce({ id: '123', nome: 'Lua' } as any)
    const res1 = createRes()
    await buscarAnimalPorId(req, res1)
    expect(res1.status).toHaveBeenCalledWith(200)

    buscarAnimalPorIdMock.mockResolvedValueOnce(null as any)
    const res2 = createRes()
    await buscarAnimalPorId(req, res2)
    expect(res2.status).toHaveBeenCalledWith(404)

    buscarAnimalPorIdMock.mockRejectedValueOnce(new Error('erro'))
    const res3 = createRes()
    await buscarAnimalPorId(req, res3)
    expect(res3.status).toHaveBeenCalledWith(400)
  })

  it('alterar: sucesso, vazio e erro', async () => {
    const req = { params: { id: '456' }, body: { nome: 'Thor' } } as any
    alterarAnimalMock.mockResolvedValueOnce({ id: '456', nome: 'Thor' } as any)
    const res1 = createRes()
    await alterarAnimal(req, res1)
    expect(res1.status).toHaveBeenCalledWith(200)

    alterarAnimalMock.mockResolvedValueOnce(null as any)
    const res2 = createRes()
    await alterarAnimal(req, res2)
    expect(res2.status).toHaveBeenCalledWith(404)

    alterarAnimalMock.mockRejectedValueOnce(new Error('erro'))
    const res3 = createRes()
    await alterarAnimal(req, res3)
    expect(res3.status).toHaveBeenCalledWith(400)
  })

  it('excluir: sucesso, vazio e erro', async () => {
    const req = { params: { id: '789' } } as any
    excluirAnimalMock.mockResolvedValueOnce({ id: '789' } as any)
    const res1 = createRes()
    await excluirAnimal(req, res1)
    expect(res1.status).toHaveBeenCalledWith(200)

    excluirAnimalMock.mockResolvedValueOnce(null as any)
    const res2 = createRes()
    await excluirAnimal(req, res2)
    expect(res2.status).toHaveBeenCalledWith(400)

    excluirAnimalMock.mockRejectedValueOnce(new Error('erro'))
    const res3 = createRes()
    await excluirAnimal(req, res3)
    expect(res3.status).toHaveBeenCalledWith(400)
  })
})
