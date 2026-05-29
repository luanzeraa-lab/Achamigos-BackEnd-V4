export interface GeminiPromptInput {
    prompt: string;
    systemInstruction?: string;
    model?: string;
}
declare class GeminiService {
    private static getClient;
    static gerarTexto(input: GeminiPromptInput): Promise<string>;
}
export default GeminiService;
//# sourceMappingURL=GeminiService.d.ts.map