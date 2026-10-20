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
const globals_1 = require("@jest/globals");
const AnimalController_1 = require("../../controllers/AnimalController");
const AnimalModel = __importStar(require("../../models/AnimalModel"));
globals_1.jest.mock('../../models/AnimalModel', () => ({
    listarAnimais: globals_1.jest.fn(),
    buscarAnimalPorId: globals_1.jest.fn(),
    cadastrarAnimal: globals_1.jest.fn(),
    alterarAnimal: globals_1.jest.fn(),
    excluirAnimal: globals_1.jest.fn(),
}));
globals_1.jest.mock('../../utils/logger', () => ({
    logger: {
        info: globals_1.jest.fn(),
        error: globals_1.jest.fn(),
    },
}));
const createRes = () => ({
    status: globals_1.jest.fn().mockReturnThis(),
    json: globals_1.jest.fn(),
});
const listarAnimaisMock = AnimalModel.listarAnimais;
const buscarAnimalPorIdMock = AnimalModel.buscarAnimalPorId;
const cadastrarAnimalMock = AnimalModel.cadastrarAnimal;
const alterarAnimalMock = AnimalModel.alterarAnimal;
const excluirAnimalMock = AnimalModel.excluirAnimal;
(0, globals_1.describe)('AnimalController', () => {
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.it)('listar: sucesso, vazio e erro', async () => {
        const req = {};
        listarAnimaisMock.mockResolvedValueOnce([{ id: '1', nome: 'Rex' }]);
        const res1 = createRes();
        await (0, AnimalController_1.listarAnimal)(req, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(200);
        (0, globals_1.expect)(res1.json).toHaveBeenCalledWith([{ id: '1', nome: 'Rex' }]);
        listarAnimaisMock.mockResolvedValueOnce(null);
        const res2 = createRes();
        await (0, AnimalController_1.listarAnimal)(req, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(404);
        listarAnimaisMock.mockRejectedValueOnce(new Error('falha'));
        const res3 = createRes();
        await (0, AnimalController_1.listarAnimal)(req, res3);
        (0, globals_1.expect)(res3.status).toHaveBeenCalledWith(400);
    });
    (0, globals_1.it)('cadastrar: sucesso e erro', async () => {
        const req = { body: { nome: 'Mel', raca: 'SRD' }, file: undefined };
        cadastrarAnimalMock.mockResolvedValueOnce({ id: '10', nome: 'Mel', raca: 'SRD' });
        const res1 = createRes();
        await (0, AnimalController_1.cadastrarAnimal)(req, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(201);
        cadastrarAnimalMock.mockRejectedValueOnce(new Error('erro'));
        const res2 = createRes();
        await (0, AnimalController_1.cadastrarAnimal)(req, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(400);
    });
    (0, globals_1.it)('buscar: sucesso, vazio e erro', async () => {
        const req = { params: { id: '123' } };
        buscarAnimalPorIdMock.mockResolvedValueOnce({ id: '123', nome: 'Lua' });
        const res1 = createRes();
        await (0, AnimalController_1.buscarAnimalPorId)(req, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(200);
        buscarAnimalPorIdMock.mockResolvedValueOnce(null);
        const res2 = createRes();
        await (0, AnimalController_1.buscarAnimalPorId)(req, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(404);
        buscarAnimalPorIdMock.mockRejectedValueOnce(new Error('erro'));
        const res3 = createRes();
        await (0, AnimalController_1.buscarAnimalPorId)(req, res3);
        (0, globals_1.expect)(res3.status).toHaveBeenCalledWith(400);
    });
    (0, globals_1.it)('alterar: sucesso, vazio e erro', async () => {
        const req = { params: { id: '456' }, body: { nome: 'Thor' } };
        alterarAnimalMock.mockResolvedValueOnce({ id: '456', nome: 'Thor' });
        const res1 = createRes();
        await (0, AnimalController_1.alterarAnimal)(req, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(200);
        alterarAnimalMock.mockResolvedValueOnce(null);
        const res2 = createRes();
        await (0, AnimalController_1.alterarAnimal)(req, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(404);
        alterarAnimalMock.mockRejectedValueOnce(new Error('erro'));
        const res3 = createRes();
        await (0, AnimalController_1.alterarAnimal)(req, res3);
        (0, globals_1.expect)(res3.status).toHaveBeenCalledWith(400);
    });
    (0, globals_1.it)('excluir: sucesso, vazio e erro', async () => {
        const req = { params: { id: '789' } };
        excluirAnimalMock.mockResolvedValueOnce({ id: '789' });
        const res1 = createRes();
        await (0, AnimalController_1.excluirAnimal)(req, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(200);
        excluirAnimalMock.mockResolvedValueOnce(null);
        const res2 = createRes();
        await (0, AnimalController_1.excluirAnimal)(req, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(400);
        excluirAnimalMock.mockRejectedValueOnce(new Error('erro'));
        const res3 = createRes();
        await (0, AnimalController_1.excluirAnimal)(req, res3);
        (0, globals_1.expect)(res3.status).toHaveBeenCalledWith(400);
    });
});
//# sourceMappingURL=AnimalController.spec.js.map