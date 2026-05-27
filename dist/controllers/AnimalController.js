"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirAnimal = exports.alterarAnimal = exports.buscarAnimalPorId = exports.cadastrarAnimal = exports.listarAnimal = void 0;
const AnimalModel = __importStar(require("../models/AnimalModel"));
const logger_1 = require("../utils/logger");
const listarAnimal = async (req, res) => {
    try {
        const animais = await AnimalModel.listarAnimais();
        if (!animais) {
            logger_1.logger.info('Nenhum animal encontrado');
            res.status(404).json({ message: 'Nenhum animal encontrado' });
            return;
        }
        logger_1.logger.info('Animais listados com sucesso', {
            quantidade: animais.length
        });
        res.status(200).json(animais);
    }
    catch (error) {
        logger_1.logger.error('Erro ao listar animais', {
            message: error.message,
            stack: error.stack
        });
        res.status(400).json({ error: error.message });
    }
};
exports.listarAnimal = listarAnimal;
const cadastrarAnimal = async (req, res) => {
    const animalData = { ...req.body };
    try {
        logger_1.logger.info('Iniciando cadastro de animal', {
            body: animalData
        });
        const animalCadastrado = await AnimalModel.cadastrarAnimal(animalData, req.file);
        logger_1.logger.info('Animal cadastrado com sucesso', {
            id: animalCadastrado?.id
        });
        res.status(201).json(animalCadastrado);
    }
    catch (error) {
        logger_1.logger.error('Erro ao cadastrar animal', {
            message: error.message,
            stack: error.stack,
            body: animalData
        });
        res.status(400).json({ error: error.message });
    }
};
exports.cadastrarAnimal = cadastrarAnimal;
const buscarAnimalPorId = async (req, res) => {
    try {
        const { id } = req.params;
        logger_1.logger.info('Buscando animal por ID', { id });
        const animal = await AnimalModel.buscarAnimalPorId(id);
        if (!animal) {
            logger_1.logger.info('Animal não encontrado', { id });
            res.status(404).json({ message: 'Animal não encontrado' });
            return;
        }
        logger_1.logger.info('Animal encontrado com sucesso', { id });
        res.status(200).json(animal);
    }
    catch (error) {
        logger_1.logger.error('Erro ao buscar animal por ID', {
            message: error.message,
            stack: error.stack,
            params: req.params
        });
        res.status(400).json({ error: error.message });
    }
};
exports.buscarAnimalPorId = buscarAnimalPorId;
const alterarAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;
        logger_1.logger.info('Alterando animal', { id, dados });
        const animalAlterado = await AnimalModel.alterarAnimal(id, dados);
        if (!animalAlterado) {
            logger_1.logger.info('Animal não encontrado para alteração', { id });
            res.status(404).json({ error: 'Animal não encontrado' });
            return;
        }
        logger_1.logger.info('Animal alterado com sucesso', { id });
        res.status(200).json(animalAlterado);
    }
    catch (error) {
        logger_1.logger.error('Erro ao alterar animal', {
            message: error.message,
            stack: error.stack,
            params: req.params,
            body: req.body
        });
        res.status(400).json({ error: error.message });
    }
};
exports.alterarAnimal = alterarAnimal;
const excluirAnimal = async (req, res) => {
    try {
        const { id } = req.params;
        logger_1.logger.info('Excluindo animal', { id });
        const animalDeletado = await AnimalModel.excluirAnimal(id);
        if (!animalDeletado) {
            logger_1.logger.info('Animal não encontrado para exclusão', { id });
            res.status(400).json({ message: 'Animal não encontrado' });
            return;
        }
        logger_1.logger.info('Animal deletado com sucesso', { id });
        res.status(200).json({ message: 'Animal deletado com sucesso' });
    }
    catch (error) {
        logger_1.logger.error('Erro ao deletar animal', {
            message: error.message,
            stack: error.stack,
            params: req.params
        });
        res.status(400).json({ error: 'Erro ao deletar animal' });
    }
};
exports.excluirAnimal = excluirAnimal;
//# sourceMappingURL=AnimalController.js.map