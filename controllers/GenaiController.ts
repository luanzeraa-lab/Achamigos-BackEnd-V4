import { Request, Response } from 'express'
import { gerartexto } from '../models/GenaiModel'
import { descricao } from '../models/BancoAnimais'
import { listarAnimais } from '../models/AnimalModel'

export async function gerartextoController(req: Request, res: Response): Promise<void> {
  try {
    const { prompt, id, nome }: any = req.body

    const animaisData = await listarAnimais()
    const resposta: string = await gerartexto( prompt + JSON.stringify(animaisData) + descricao );

    let respostaJson: any = null
    try {
      respostaJson = JSON.parse(resposta)
    } catch {
      respostaJson = null
    }

    const extrairValor = (texto: string, marcador: string): string | null => {
      const inicio = texto.indexOf(marcador)
      if (inicio === -1) return null

      const valor = texto.slice(inicio + marcador.length).split('\n')[0]?.trim()
      return valor || null
    }

    const idExtraido = respostaJson?.id ?? extrairValor(resposta, '**ID:**') ?? null
    const nomeExtraido = respostaJson?.nome ?? extrairValor(resposta, '**Nome:**') ?? null
    const respostaExtraida = respostaJson?.resposta ?? resposta

    const idFinal = id ?? idExtraido
    const nomeFinal = nome ?? nomeExtraido

    res.json({
      id: idFinal,
      nome: nomeFinal,
      resposta: respostaExtraida
    })
    } catch (error) {
  console.error("DEBUG - Erro no Controller:", error); // Adicione isso!
  res.status(400).json({ erro: 'Erro ao gerar texto', detalhe: error instanceof Error ? error.message : error })
}
}