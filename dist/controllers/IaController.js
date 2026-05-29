"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarHistorico = exports.enviarPrompt = void 0;
const GeminiService_1 = __importDefault(require("../services/GeminiService"));
const chatHistory = [];
const enviarPrompt = async (req, res) => {
    try {
        const { prompt, systemInstruction, model, saveHistory, userId } = req.body;
        if (!prompt || !prompt.trim()) {
            res.status(400).json({ message: 'O campo "prompt" é obrigatório' });
            return;
        }
        const respostaGerada = await GeminiService_1.default.gerarTexto({
            prompt: prompt.trim(),
            systemInstruction,
            model,
        });
        const modeloFinal = model || process.env.GEMINI_MODEL || 'gemini-2.0-flash';
        if (saveHistory) {
            const item = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                userId,
                prompt: prompt.trim(),
                response: respostaGerada,
                model: modeloFinal,
                createdAt: new Date().toISOString(),
            };
            chatHistory.push(item);
        }
        res.status(200).json({
            model: modeloFinal,
            response: respostaGerada,
            savedToHistory: Boolean(saveHistory),
        });
    }
    catch (error) {
        if (error?.message?.includes('GEMINI_API_KEY')) {
            res.status(500).json({
                message: 'Configuração inválida do servidor para Gemini API',
            });
            return;
        }
        res.status(500).json({
            message: 'Erro ao gerar resposta com Gemini',
            error: error?.message || 'Erro desconhecido',
        });
    }
};
exports.enviarPrompt = enviarPrompt;
const listarHistorico = async (req, res) => {
    try {
        const { userId } = req.query;
        if (typeof userId === 'string' && userId.trim()) {
            const itensUsuario = chatHistory.filter((item) => item.userId === userId);
            res.status(200).json(itensUsuario);
            return;
        }
        res.status(200).json(chatHistory);
    }
    catch (error) {
        res.status(500).json({
            message: 'Erro ao listar histórico de IA',
            error: error?.message || 'Erro desconhecido',
        });
    }
};
exports.listarHistorico = listarHistorico;
//# sourceMappingURL=IaController.js.map