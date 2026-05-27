"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarTextoController = gerarTextoController;
const GenaiModel_1 = require("../models/GenaiModel");
const BancoAnimais_1 = require("../models/BancoAnimais");
const AnimalModel_1 = require("../models/AnimalModel");
async function gerarTextoController(req, res) {
    try {
        const { prompt, id, nome } = req.body;
        const animaisData = await (0, AnimalModel_1.listarAnimais)();
        const resposta = await (0, GenaiModel_1.gerarTexto)(prompt + JSON.stringify(animaisData) + BancoAnimais_1.descricao);
        let respostaJson = null;
        try {
            respostaJson = JSON.parse(resposta);
        }
        catch {
            respostaJson = null;
        }
        const extrairValor = (texto, marcador) => {
            const inicio = texto.indexOf(marcador);
            if (inicio === -1)
                return null;
            const valor = texto.slice(inicio + marcador.length).split('\n')[0]?.trim();
            return valor || null;
        };
        const idExtraido = respostaJson?.id ?? extrairValor(resposta, '**ID:**') ?? null;
        const nomeExtraido = respostaJson?.nome ?? extrairValor(resposta, '**Nome:**') ?? null;
        const respostaExtraida = respostaJson?.resposta ?? resposta;
        const idFinal = id ?? idExtraido;
        const nomeFinal = nome ?? nomeExtraido;
        res.json({
            id: idFinal,
            nome: nomeFinal,
            resposta: respostaExtraida
        });
    }
    catch {
        res.status(400).json({ erro: 'Erro ao gerar texto' });
    }
}
//# sourceMappingURL=GenaiController.js.map