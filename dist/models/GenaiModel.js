"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerartexto = gerartexto;
async function gerartexto(prompt) {
    try {
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });
        return response.text ?? '';
    }
    catch (error) {
        console.error("ERRO GENAI:", error);
        throw error;
    }
}
//# sourceMappingURL=GenaiModel.js.map