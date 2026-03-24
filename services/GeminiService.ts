export interface GeminiPromptInput {
  prompt: string
  systemInstruction?: string
  model?: string
}

class GeminiService {
  private static async getClient() {
    const { GoogleGenAI } = await import('@google/genai')
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY não configurada no ambiente')
    }

    return new GoogleGenAI({ apiKey })
  }

  static async gerarTexto(input: GeminiPromptInput): Promise<string> {
    const client = await this.getClient()
    const model = input.model || process.env.GEMINI_MODEL || 'gemini-2.0-flash'

    const response = await client.models.generateContent({
      model,
      contents: input.prompt,
      config: {
        // Instrução opcional para definir tom/comportamento do modelo
        ...(input.systemInstruction
          ? { systemInstruction: input.systemInstruction }
          : {}),
      },
    })

    const texto = response.text?.trim()

    if (!texto) {
      throw new Error('A resposta do Gemini veio vazia')
    }

    return texto
  }
}

export default GeminiService