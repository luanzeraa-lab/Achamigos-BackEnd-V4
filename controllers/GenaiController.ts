import { Request, Response } from 'express'
import { gerarTexto } from '../services/GenaiService'

export async function gerarTextoController(req: Request, res: Response): Promise<void> {
  try {
    const { prompt }: any = req.body

    const resposta: string = await gerarTexto(prompt)

    res.json({ resposta })
  } catch {
    res.status(400).json({ erro: 'Erro ao gerar texto' })
  }
}