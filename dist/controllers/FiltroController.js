"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filtrar = void 0;
const AnimalModel_1 = require("../models/AnimalModel");
const filtrar = async (req, res) => {
    try {
        const filtros = req.query;
        const animaisFiltrados = await (0, AnimalModel_1.filtrarAnimais)(filtros);
        if (!animaisFiltrados || animaisFiltrados.length === 0) {
            res.status(200).json([]);
            return;
        }
        res.status(200).json(animaisFiltrados);
    }
    catch (error) {
        console.error('Erro ao buscar animais com filtros:', error);
        res.status(500).json({ error: error.message });
    }
};
exports.filtrar = filtrar;
//# sourceMappingURL=FiltroController.js.map