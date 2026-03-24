import { Request, Response } from 'express'
import GeminiService from '../services/GeminiService'

interface PromptBody {
  prompt?: string
  systemInstruction?: string
  model?: string
  saveHistory?: boolean
  userId?: string
}

interface ChatHistoryItem {
  id: string
  userId?: string
  prompt: string
  response: string
  model: string
  createdAt: string
}

const chatHistory: ChatHistoryItem[] = []

export const enviarPrompt = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, systemInstruction, model, saveHistory, userId } =
      req.body as PromptBody

    if (!prompt || !prompt.trim()) {
      res.status(400).json({ message: 'O campo "prompt" é obrigatório' })
      return
    }

    const respostaGerada = await GeminiService.gerarTexto({
      prompt: prompt.trim(),
      systemInstruction,
      model,
    })

    const modeloFinal = model || process.env.GEMINI_MODEL || 'gemini-2.0-flash'

    if (saveHistory) {
      const item: ChatHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        userId,
        prompt: prompt.trim(),
        response: respostaGerada,
        model: modeloFinal,
        createdAt: new Date().toISOString(),
      }
      chatHistory.push(item)
    }

    res.status(200).json({
      model: modeloFinal,
      response: respostaGerada,
      savedToHistory: Boolean(saveHistory),
    })
  } catch (error: any) {
    if (error?.message?.includes('GEMINI_API_KEY')) {
      res.status(500).json({
        message: 'Configuração inválida do servidor para Gemini API',
      })
      return
    }

    res.status(500).json({
      message: 'Erro ao gerar resposta com Gemini',
      error: error?.message || 'Erro desconhecido',
    })
  }
}

export const listarHistorico = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.query

    if (typeof userId === 'string' && userId.trim()) {
      const itensUsuario = chatHistory.filter((item) => item.userId === userId)
      res.status(200).json(itensUsuario)
      return
    }

    res.status(200).json(chatHistory)
  } catch (error: any) {
    res.status(500).json({
      message: 'Erro ao listar histórico de IA',
      error: error?.message || 'Erro desconhecido',
    })
  }
}