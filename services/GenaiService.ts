export async function gerarTexto(prompt: string): Promise<string> {
  try {
    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY!,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text!;
  } catch (error) {
    console.error("ERRO GENAI:", error);
    throw error;
  }
}