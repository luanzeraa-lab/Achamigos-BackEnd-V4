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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const globals_1 = require("@jest/globals");
const apiKeyAuth_1 = __importDefault(require("../../middleware/apiKeyAuth"));
const AnimalRoute_1 = __importDefault(require("../../routes/AnimalRoute"));
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
const listarAnimaisMock = AnimalModel.listarAnimais;
const buscarAnimalPorIdMock = AnimalModel.buscarAnimalPorId;
const cadastrarAnimalMock = AnimalModel.cadastrarAnimal;
const alterarAnimalMock = AnimalModel.alterarAnimal;
const excluirAnimalMock = AnimalModel.excluirAnimal;
(0, globals_1.describe)('Animal integration tests', () => {
    const apiKey = 'test-api-key';
    (0, globals_1.beforeAll)(() => {
        process.env.API_KEY = apiKey;
    });
    const createApp = () => {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use(apiKeyAuth_1.default);
        app.use('/api', AnimalRoute_1.default);
        return app;
    };
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.it)('deve listar animais na rota GET /api/animais', async () => {
        const animais = [
            {
                id: '1',
                nome: 'Rex',
                raca: 'Vira-lata',
            },
        ];
        listarAnimaisMock.mockResolvedValue(animais);
        const response = await (0, supertest_1.default)(createApp())
            .get('/api/animais')
            .set('x-api-key', apiKey);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toEqual(animais);
        (0, globals_1.expect)(AnimalModel.listarAnimais).toHaveBeenCalledTimes(1);
    });
    (0, globals_1.it)('deve buscar um animal na rota GET /api/animais/:id', async () => {
        const animal = {
            id: '123',
            nome: 'Lua',
            raca: 'SRD',
        };
        buscarAnimalPorIdMock.mockResolvedValue(animal);
        const response = await (0, supertest_1.default)(createApp())
            .get('/api/animais/123')
            .set('x-api-key', apiKey);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toEqual(animal);
        (0, globals_1.expect)(AnimalModel.buscarAnimalPorId).toHaveBeenCalledWith('123');
    });
    (0, globals_1.it)('deve cadastrar um animal na rota POST /api/animais', async () => {
        const novoAnimal = {
            id: '321',
            nome: 'Mel',
            raca: 'Poodle',
        };
        cadastrarAnimalMock.mockResolvedValue(novoAnimal);
        const response = await (0, supertest_1.default)(createApp())
            .post('/api/animais')
            .set('x-api-key', apiKey)
            .send({
            nome: 'Mel',
            raca: 'Poodle',
            sexo: 'Fêmea',
            porte: 'Pequeno',
            castracao: true,
            tipo: 'Cachorro',
            userId: 'user-1',
        });
        (0, globals_1.expect)(response.status).toBe(201);
        (0, globals_1.expect)(response.body).toEqual(novoAnimal);
        (0, globals_1.expect)(AnimalModel.cadastrarAnimal).toHaveBeenCalledTimes(1);
        (0, globals_1.expect)(AnimalModel.cadastrarAnimal).toHaveBeenCalledWith(globals_1.expect.objectContaining({
            nome: 'Mel',
            raca: 'Poodle',
            sexo: 'Fêmea',
            porte: 'Pequeno',
            castracao: true,
            tipo: 'Cachorro',
            userId: 'user-1',
        }), undefined);
    });
    (0, globals_1.it)('deve alterar um animal na rota PUT /api/animais/:id', async () => {
        const animalAtualizado = {
            id: '456',
            nome: 'Thor',
            raca: 'Labrador',
        };
        alterarAnimalMock.mockResolvedValue(animalAtualizado);
        const response = await (0, supertest_1.default)(createApp())
            .put('/api/animais/456')
            .set('x-api-key', apiKey)
            .send({
            nome: 'Thor',
            raca: 'Labrador',
        });
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toEqual(animalAtualizado);
        (0, globals_1.expect)(AnimalModel.alterarAnimal).toHaveBeenCalledWith('456', {
            nome: 'Thor',
            raca: 'Labrador',
        });
    });
    (0, globals_1.it)('deve excluir um animal na rota DELETE /api/animais/:id', async () => {
        excluirAnimalMock.mockResolvedValue({
            id: '789',
        });
        const response = await (0, supertest_1.default)(createApp())
            .delete('/api/animais/789')
            .set('x-api-key', apiKey);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toEqual({ message: 'Animal deletado com sucesso' });
        (0, globals_1.expect)(AnimalModel.excluirAnimal).toHaveBeenCalledWith('789');
    });
});
//# sourceMappingURL=animalRoute.spec.js.map