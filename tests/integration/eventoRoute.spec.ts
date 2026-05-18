import express from 'express'
import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals'

import apiKeyAuth from '../../middleware/apiKeyAuth'
import eventoRoute from '../../routes/EventoRoute'
import path from 'path'
import * as EventoModel from '../../models/EventoModel'
import type { IEvento } from '../../types'

jest.mock('../../models/EventoModel', () => ({
  listarEvento: jest.fn(),
  cadastrarEvento: jest.fn(),
  alterarEvento: jest.fn(),
  excluirEvento: jest.fn(),
}))

const listarEventoMock = EventoModel.listarEvento as jest.MockedFunction<
  typeof EventoModel.listarEvento
>
const cadastrarEventoMock = EventoModel.cadastrarEvento as jest.MockedFunction<
  typeof EventoModel.cadastrarEvento
>
const alterarEventoMock = EventoModel.alterarEvento as jest.MockedFunction<
  typeof EventoModel.alterarEvento
>
const excluirEventoMock = EventoModel.excluirEvento as jest.MockedFunction<
  typeof EventoModel.excluirEvento
>

describe('Evento integration tests', () => {
  const apiKey = 'test-api-key'

  beforeAll(() => {
    process.env.API_KEY = apiKey
  })

  const createApp = () => {
    const app = express()

    app.use(express.json())
    app.use(apiKeyAuth)
    app.use('/api', eventoRoute)

    return app
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve listar eventos na rota GET /api/eventos', async () => {
    const eventos = [
      {
        id: '1',
        nomeEvento: 'Feira Pet',
        tipo_Evento: 'Adoção',
      } as unknown as IEvento,
    ] as IEvento[]

    listarEventoMock.mockResolvedValue(eventos)

    const response = await request(createApp())
      .get('/api/eventos')
      .set('x-api-key', apiKey)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(eventos)
    expect(EventoModel.listarEvento).toHaveBeenCalledTimes(1)
  })

  it('deve cadastrar evento na rota POST /api/eventos', async () => {
    const novoEvento = {
      id: '2',
      nomeEvento: 'Cãominhada',
      tipo_Evento: 'Passeio',
    } as unknown as IEvento

    cadastrarEventoMock.mockResolvedValue(novoEvento)

    const response = await request(createApp())
      .post('/api/eventos')
      .set('x-api-key', apiKey)
      .send({
        nomeEvento: 'Cãominhada',
        tipo_Evento: 'Passeio',
        texto: 'Evento para cães e tutores',
        data: '2026-05-04T00:00:00.000Z',
        linkEvento: 'https://exemplo.com/evento',
      })

    expect(response.status).toBe(201)
    expect(response.body).toEqual(novoEvento)
    expect(EventoModel.cadastrarEvento).toHaveBeenCalledTimes(1)
    expect(EventoModel.cadastrarEvento).toHaveBeenCalledWith(
      expect.objectContaining({
        nomeEvento: 'Cãominhada',
        tipo_Evento: 'Passeio',
        texto: 'Evento para cães e tutores',
        data: '2026-05-04T00:00:00.000Z',
        linkEvento: 'https://exemplo.com/evento',
      }),
      undefined
    )
  })

  it('deve cadastrar evento com imagem na rota POST /api/eventos (upload)', async () => {
    const novoEvento = {
      id: '5',
      nomeEvento: 'Passeio com Pets',
      tipo_Evento: 'Passeio',
    } as unknown as IEvento

    cadastrarEventoMock.mockResolvedValue(novoEvento)

    const filePath = path.join(__dirname, '../../public/custom.css')

    const response = await request(createApp())
      .post('/api/eventos')
      .set('x-api-key', apiKey)
      .field('nomeEvento', 'Passeio com Pets')
      .field('tipo_Evento', 'Passeio')
      .attach('imagem', filePath)

    expect(response.status).toBe(201)
    expect(EventoModel.cadastrarEvento).toHaveBeenCalledTimes(1)
    expect(EventoModel.cadastrarEvento).toHaveBeenCalledWith(
      expect.objectContaining({ nomeEvento: 'Passeio com Pets', tipo_Evento: 'Passeio' }),
      expect.any(Object)
    )
  })

  it('deve alterar evento na rota PUT /api/eventos/:id', async () => {
    const eventoAtualizado = {
      id: '3',
      nomeEvento: 'Feira Pet Atualizada',
      tipo_Evento: 'Adoção',
    } as unknown as IEvento

    alterarEventoMock.mockResolvedValue(eventoAtualizado)

    const response = await request(createApp())
      .put('/api/eventos/3')
      .set('x-api-key', apiKey)
      .send({
        nomeEvento: 'Feira Pet Atualizada',
        tipo_Evento: 'Adoção',
      })

    expect(response.status).toBe(201)
    expect(response.body).toEqual(eventoAtualizado)
    expect(EventoModel.alterarEvento).toHaveBeenCalledWith('3', {
      nomeEvento: 'Feira Pet Atualizada',
      tipo_Evento: 'Adoção',
    })
  })

  it('deve excluir evento na rota DELETE /api/eventos/:id', async () => {
    const eventoDeletado = {
      id: '4',
      nomeEvento: 'Evento Antigo',
      tipo_Evento: 'Palestra',
    } as unknown as IEvento

    excluirEventoMock.mockResolvedValue(eventoDeletado)

    const response = await request(createApp())
      .delete('/api/eventos/4')
      .set('x-api-key', apiKey)

    expect(response.status).toBe(201)
    expect(response.body).toEqual(eventoDeletado)
    expect(EventoModel.excluirEvento).toHaveBeenCalledWith('4')
  })
})