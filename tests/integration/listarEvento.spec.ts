import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { listarEvento, cadastrarEvento, alterarEvento, excluirEvento } from '../../controllers/EventoController'
import * as EventoModel from '../../models/EventoModel'

jest.mock('../../models/EventoModel', () => ({
  listarEvento: jest.fn(),
  cadastrarEvento: jest.fn(),
  alterarEvento: jest.fn(),
  excluirEvento: jest.fn(),
}))

const createRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as any)

const listarEventoMock = EventoModel.listarEvento as jest.MockedFunction<typeof EventoModel.listarEvento>
const cadastrarEventoMock = EventoModel.cadastrarEvento as jest.MockedFunction<typeof EventoModel.cadastrarEvento>
const alterarEventoMock = EventoModel.alterarEvento as jest.MockedFunction<typeof EventoModel.alterarEvento>
const excluirEventoMock = EventoModel.excluirEvento as jest.MockedFunction<typeof EventoModel.excluirEvento>

describe('EventoController', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('listar: sucesso, vazio e erro', async () => {
    const req = {} as any
    listarEventoMock.mockResolvedValueOnce([{ id: '1', nomeEvento: 'Show' }] as any)
    const res1 = createRes()
    await listarEvento(req, res1)
    expect(res1.status).toHaveBeenCalledWith(200)

    listarEventoMock.mockResolvedValueOnce(null as any)
    const res2 = createRes()
    await listarEvento(req, res2)
    expect(res2.status).toHaveBeenCalledWith(404)

    listarEventoMock.mockRejectedValueOnce(new Error('erro'))
    const res3 = createRes()
    await listarEvento(req, res3)
    expect(res3.status).toHaveBeenCalledWith(400)
  })

  it('cadastrar: sucesso, vazio e erro', async () => {
    const req1 = { body: { nomeEvento: 'Show', tipo_Evento: 'Musica' }, file: undefined } as any
    cadastrarEventoMock.mockResolvedValueOnce({ id: '10', nomeEvento: 'Show' } as any)
    const res1 = createRes()
    await cadastrarEvento(req1, res1)
    expect(res1.status).toHaveBeenCalledWith(201)

    const req2 = { body: { nomeEvento: 'Show' }, file: undefined } as any
    cadastrarEventoMock.mockResolvedValueOnce(null as any)
    const res2 = createRes()
    await cadastrarEvento(req2, res2)
    expect(res2.status).toHaveBeenCalledWith(400)

    cadastrarEventoMock.mockRejectedValueOnce(new Error('erro'))
    const res3 = createRes()
    await cadastrarEvento(req2, res3)
    expect(res3.status).toHaveBeenCalledWith(500)
  })

  it('alterar: sucesso, vazio e erro', async () => {
    const req = { params: { id: '20' }, body: { nomeEvento: 'Novo nome' } } as any
    alterarEventoMock.mockResolvedValueOnce({ id: '20', nomeEvento: 'Novo nome' } as any)
    const res1 = createRes()
    await alterarEvento(req, res1)
    expect(res1.status).toHaveBeenCalledWith(201)

    alterarEventoMock.mockResolvedValueOnce(null as any)
    const res2 = createRes()
    await alterarEvento(req, res2)
    expect(res2.status).toHaveBeenCalledWith(400)

    alterarEventoMock.mockRejectedValueOnce(new Error('erro'))
    const res3 = createRes()
    await alterarEvento(req, res3)
    expect(res3.status).toHaveBeenCalledWith(500)
  })

  it('excluir: sucesso, vazio e erro', async () => {
    const req = { params: { id: '30' } } as any
    excluirEventoMock.mockResolvedValueOnce({ id: '30' } as any)
    const res1 = createRes()
    await excluirEvento(req, res1)
    expect(res1.status).toHaveBeenCalledWith(201)

    excluirEventoMock.mockResolvedValueOnce(null as any)
    const res2 = createRes()
    await excluirEvento(req, res2)
    expect(res2.status).toHaveBeenCalledWith(400)

    excluirEventoMock.mockRejectedValueOnce(new Error('erro'))
    const res3 = createRes()
    await excluirEvento(req, res3)
    expect(res3.status).toHaveBeenCalledWith(500)
  })

  it('evento CRUD coverage completo', async () => {
    const req = { params: { id: '40' }, body: { nomeEvento: 'Concert' } } as any
    alterarEventoMock.mockResolvedValueOnce({ id: '40', nomeEvento: 'Concert' } as any)
    const res = createRes()
    await alterarEvento(req, res)
    expect(res.status).toHaveBeenCalledWith(201)
  })

  it('evento fluxo integrado', async () => {
    const req = { body: { nomeEvento: 'Festival', tipo_Evento: 'Musica' }, file: undefined } as any
    cadastrarEventoMock.mockResolvedValueOnce({ id: '50', nomeEvento: 'Festival' } as any)
    const res = createRes()
    await cadastrarEvento(req, res)
    expect(res.status).toHaveBeenCalledWith(201)
  })
})