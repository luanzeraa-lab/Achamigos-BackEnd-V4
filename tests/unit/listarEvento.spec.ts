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

  it('lista eventos com sucesso', async () => {
    const req = {} as any
    const res = createRes()

    listarEventoMock.mockResolvedValue([{ id: '1', nomeEvento: 'Show' }] as any)

    await listarEvento(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith([{ id: '1', nomeEvento: 'Show' }])
  })

  it('retorna 404 quando nao ha eventos', async () => {
    const req = {} as any
    const res = createRes()

    listarEventoMock.mockResolvedValue(null as any)

    await listarEvento(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'Nenhum evento encontrado' })
  })

  it('retorna erro ao listar eventos', async () => {
    const req = {} as any
    const res = createRes()

    listarEventoMock.mockRejectedValue(new Error('erro na listagem'))

    await listarEvento(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'erro na listagem' })
  })

  it('cadastra evento com sucesso', async () => {
    const req = { body: { nomeEvento: 'Show', tipo_Evento: 'Musica' }, file: undefined } as any
    const res = createRes()

    cadastrarEventoMock.mockResolvedValue({ id: '10', nomeEvento: 'Show' } as any)

    await cadastrarEvento(req, res)

    expect(EventoModel.cadastrarEvento).toHaveBeenCalledWith({ nomeEvento: 'Show', tipo_Evento: 'Musica' }, undefined)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ id: '10', nomeEvento: 'Show' })
  })

  it('retorna 400 quando nao cria o evento', async () => {
    const req = { body: { nomeEvento: 'Show' }, file: undefined } as any
    const res = createRes()

    cadastrarEventoMock.mockResolvedValue(null as any)

    await cadastrarEvento(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao cadastrar Evento' })
  })

  it('retorna erro ao cadastrar evento', async () => {
    const req = { body: { nomeEvento: 'Show' }, file: undefined } as any
    const res = createRes()

    cadastrarEventoMock.mockRejectedValue(new Error('erro ao cadastrar'))

    await cadastrarEvento(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'erro ao cadastrar' })
  })

  it('altera evento com sucesso', async () => {
    const req = { params: { id: '20' }, body: { nomeEvento: 'Novo nome' } } as any
    const res = createRes()

    alterarEventoMock.mockResolvedValue({ id: '20', nomeEvento: 'Novo nome' } as any)

    await alterarEvento(req, res)

    expect(EventoModel.alterarEvento).toHaveBeenCalledWith('20', { nomeEvento: 'Novo nome' })
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ id: '20', nomeEvento: 'Novo nome' })
  })

  it('retorna 400 quando nao altera o evento', async () => {
    const req = { params: { id: '20' }, body: { nomeEvento: 'Novo nome' } } as any
    const res = createRes()

    alterarEventoMock.mockResolvedValue(null as any)

    await alterarEvento(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao alterar Evento' })
  })

  it('retorna erro ao alterar evento', async () => {
    const req = { params: { id: '20' }, body: { nomeEvento: 'Novo nome' } } as any
    const res = createRes()

    alterarEventoMock.mockRejectedValue(new Error('erro ao alterar'))

    await alterarEvento(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'erro ao alterar' })
  })

  it('exclui evento com sucesso', async () => {
    const req = { params: { id: '30' } } as any
    const res = createRes()

    excluirEventoMock.mockResolvedValue({ id: '30' } as any)

    await excluirEvento(req, res)

    expect(EventoModel.excluirEvento).toHaveBeenCalledWith('30')
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ id: '30' })
  })

  it('retorna 400 quando nao exclui o evento', async () => {
    const req = { params: { id: '30' } } as any
    const res = createRes()

    excluirEventoMock.mockResolvedValue(null as any)

    await excluirEvento(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao alterar Evento' })
  })

  it('retorna erro ao excluir evento', async () => {
    const req = { params: { id: '30' } } as any
    const res = createRes()

    excluirEventoMock.mockRejectedValue(new Error('erro ao excluir'))

    await excluirEvento(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'erro ao excluir' })
  })
})