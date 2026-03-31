import { Request, Response } from 'express'
import { gerarTexto } from '../services/GenaiService'
import {animais, descricao} from '../models/BancoAnimais'
//c

export async function gerarTextoController(req: Request, res: Response): Promise<void> {
  try {
    const { prompt }: any = req.body


    const resposta: string = await gerarTexto( prompt + JSON.stringify(animais) + descricao );

    res.json({ resposta })
  } catch {
    res.status(400).json({ erro: 'Erro ao gerar texto' })
  }
}