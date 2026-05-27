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
const EventoRoute_1 = __importDefault(require("../../routes/EventoRoute"));
const EventoModel = __importStar(require("../../models/EventoModel"));
globals_1.jest.mock('../../models/EventoModel', () => ({
    listarEvento: globals_1.jest.fn(),
    cadastrarEvento: globals_1.jest.fn(),
    alterarEvento: globals_1.jest.fn(),
    excluirEvento: globals_1.jest.fn(),
}));
const listarEventoMock = EventoModel.listarEvento;
const cadastrarEventoMock = EventoModel.cadastrarEvento;
const alterarEventoMock = EventoModel.alterarEvento;
const excluirEventoMock = EventoModel.excluirEvento;
(0, globals_1.describe)('Evento integration tests', () => {
    const apiKey = 'test-api-key';
    (0, globals_1.beforeAll)(() => {
        process.env.API_KEY = apiKey;
    });
    const createApp = () => {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use(apiKeyAuth_1.default);
        app.use('/api', EventoRoute_1.default);
        return app;
    };
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.it)('deve listar eventos na rota GET /api/eventos', async () => {
        const eventos = [
            {
                id: '1',
                nomeEvento: 'Feira Pet',
                tipo_Evento: 'Adoção',
            },
        ];
        listarEventoMock.mockResolvedValue(eventos);
        const response = await (0, supertest_1.default)(createApp())
            .get('/api/eventos')
            .set('x-api-key', apiKey);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toEqual(eventos);
        (0, globals_1.expect)(EventoModel.listarEvento).toHaveBeenCalledTimes(1);
    });
    (0, globals_1.it)('deve cadastrar evento na rota POST /api/eventos', async () => {
        const novoEvento = {
            id: '2',
            nomeEvento: 'Cãominhada',
            tipo_Evento: 'Passeio',
        };
        cadastrarEventoMock.mockResolvedValue(novoEvento);
        const response = await (0, supertest_1.default)(createApp())
            .post('/api/eventos')
            .set('x-api-key', apiKey)
            .send({
            nomeEvento: 'Cãominhada',
            tipo_Evento: 'Passeio',
            texto: 'Evento para cães e tutores',
            data: '2026-05-04T00:00:00.000Z',
            linkEvento: 'https://exemplo.com/evento',
        });
        (0, globals_1.expect)(response.status).toBe(201);
        (0, globals_1.expect)(response.body).toEqual(novoEvento);
        (0, globals_1.expect)(EventoModel.cadastrarEvento).toHaveBeenCalledTimes(1);
        (0, globals_1.expect)(EventoModel.cadastrarEvento).toHaveBeenCalledWith(globals_1.expect.objectContaining({
            nomeEvento: 'Cãominhada',
            tipo_Evento: 'Passeio',
            texto: 'Evento para cães e tutores',
            data: '2026-05-04T00:00:00.000Z',
            linkEvento: 'https://exemplo.com/evento',
        }), undefined);
    });
    (0, globals_1.it)('deve alterar evento na rota PUT /api/eventos/:id', async () => {
        const eventoAtualizado = {
            id: '3',
            nomeEvento: 'Feira Pet Atualizada',
            tipo_Evento: 'Adoção',
        };
        alterarEventoMock.mockResolvedValue(eventoAtualizado);
        const response = await (0, supertest_1.default)(createApp())
            .put('/api/eventos/3')
            .set('x-api-key', apiKey)
            .send({
            nomeEvento: 'Feira Pet Atualizada',
            tipo_Evento: 'Adoção',
        });
        (0, globals_1.expect)(response.status).toBe(201);
        (0, globals_1.expect)(response.body).toEqual(eventoAtualizado);
        (0, globals_1.expect)(EventoModel.alterarEvento).toHaveBeenCalledWith('3', {
            nomeEvento: 'Feira Pet Atualizada',
            tipo_Evento: 'Adoção',
        });
    });
    (0, globals_1.it)('deve excluir evento na rota DELETE /api/eventos/:id', async () => {
        const eventoDeletado = {
            id: '4',
            nomeEvento: 'Evento Antigo',
            tipo_Evento: 'Palestra',
        };
        excluirEventoMock.mockResolvedValue(eventoDeletado);
        const response = await (0, supertest_1.default)(createApp())
            .delete('/api/eventos/4')
            .set('x-api-key', apiKey);
        (0, globals_1.expect)(response.status).toBe(201);
        (0, globals_1.expect)(response.body).toEqual(eventoDeletado);
        (0, globals_1.expect)(EventoModel.excluirEvento).toHaveBeenCalledWith('4');
    });
});
//# sourceMappingURL=eventoRoute.spec.js.map