import { Request, Response } from 'express'
import { gerarTexto } from '../services/GenaiService'
import {animais, descricao} from '../models/BancoAnimais'

export async function gerarTextoController(req: Request, res: Response): Promise<void> {
  try {
    const { prompt, id, nome }: any = req.body

    const resposta: string = await gerarTexto( prompt + JSON.stringify(animais) + descricao );

    let respostaJson: any = null
    try {
      respostaJson = JSON.parse(resposta)
    } catch {
      respostaJson = null
    }

    const idExtraido = respostaJson?.id ?? resposta.match(/\*\*ID:\*\*\s*(\d+)/i)?.[1] ?? null
    const nomeExtraido = respostaJson?.nome ?? resposta.match(/\*\*Nome:\*\*\s*([^\n\r]+)/i)?.[1]?.trim() ?? null
    const respostaExtraida = respostaJson?.resposta ?? resposta

    const idFinal = id ?? idExtraido
    const nomeFinal = nome ?? nomeExtraido

    res.json({
      id: idFinal,
      nome: nomeFinal,
      resposta: respostaExtraida
    })
  } catch {
    res.status(400).json({ erro: 'Erro ao gerar texto' })
  }
}