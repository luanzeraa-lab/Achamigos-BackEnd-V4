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
const EventoController_1 = require("../../controllers/EventoController");
const EventoModel = __importStar(require("../../models/EventoModel"));
globals_1.jest.mock('../../models/EventoModel', () => ({
    listarEvento: globals_1.jest.fn(),
    cadastrarEvento: globals_1.jest.fn(),
    alterarEvento: globals_1.jest.fn(),
    excluirEvento: globals_1.jest.fn(),
}));
const createRes = () => ({
    status: globals_1.jest.fn().mockReturnThis(),
    json: globals_1.jest.fn(),
});
const listarEventoMock = EventoModel.listarEvento;
const cadastrarEventoMock = EventoModel.cadastrarEvento;
const alterarEventoMock = EventoModel.alterarEvento;
const excluirEventoMock = EventoModel.excluirEvento;
(0, globals_1.describe)('EventoController', () => {
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.it)('listar: sucesso, vazio e erro', async () => {
        const req = {};
        listarEventoMock.mockResolvedValueOnce([{ id: '1', nomeEvento: 'Show' }]);
        const res1 = createRes();
        await (0, EventoController_1.listarEvento)(req, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(200);
        listarEventoMock.mockResolvedValueOnce(null);
        const res2 = createRes();
        await (0, EventoController_1.listarEvento)(req, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(404);
        listarEventoMock.mockRejectedValueOnce(new Error('erro'));
        const res3 = createRes();
        await (0, EventoController_1.listarEvento)(req, res3);
        (0, globals_1.expect)(res3.status).toHaveBeenCalledWith(400);
    });
    (0, globals_1.it)('cadastrar: sucesso, vazio e erro', async () => {
        const req1 = { body: { nomeEvento: 'Show', tipo_Evento: 'Musica' }, file: undefined };
        cadastrarEventoMock.mockResolvedValueOnce({ id: '10', nomeEvento: 'Show' });
        const res1 = createRes();
        await (0, EventoController_1.cadastrarEvento)(req1, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(201);
        const req2 = { body: { nomeEvento: 'Show' }, file: undefined };
        cadastrarEventoMock.mockResolvedValueOnce(null);
        const res2 = createRes();
        await (0, EventoController_1.cadastrarEvento)(req2, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(400);
        cadastrarEventoMock.mockRejectedValueOnce(new Error('erro'));
        const res3 = createRes();
        await (0, EventoController_1.cadastrarEvento)(req2, res3);
        (0, globals_1.expect)(res3.status).toHaveBeenCalledWith(500);
    });
    (0, globals_1.it)('alterar: sucesso, vazio e erro', async () => {
        const req = { params: { id: '20' }, body: { nomeEvento: 'Novo nome' } };
        alterarEventoMock.mockResolvedValueOnce({ id: '20', nomeEvento: 'Novo nome' });
        const res1 = createRes();
        await (0, EventoController_1.alterarEvento)(req, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(201);
        alterarEventoMock.mockResolvedValueOnce(null);
        const res2 = createRes();
        await (0, EventoController_1.alterarEvento)(req, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(400);
        alterarEventoMock.mockRejectedValueOnce(new Error('erro'));
        const res3 = createRes();
        await (0, EventoController_1.alterarEvento)(req, res3);
        (0, globals_1.expect)(res3.status).toHaveBeenCalledWith(500);
    });
    (0, globals_1.it)('excluir: sucesso, vazio e erro', async () => {
        const req = { params: { id: '30' } };
        excluirEventoMock.mockResolvedValueOnce({ id: '30' });
        const res1 = createRes();
        await (0, EventoController_1.excluirEvento)(req, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(201);
        excluirEventoMock.mockResolvedValueOnce(null);
        const res2 = createRes();
        await (0, EventoController_1.excluirEvento)(req, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(400);
        excluirEventoMock.mockRejectedValueOnce(new Error('erro'));
        const res3 = createRes();
        await (0, EventoController_1.excluirEvento)(req, res3);
        (0, globals_1.expect)(res3.status).toHaveBeenCalledWith(500);
    });
    (0, globals_1.it)('evento CRUD coverage completo', async () => {
        const req = { params: { id: '40' }, body: { nomeEvento: 'Concert' } };
        alterarEventoMock.mockResolvedValueOnce({ id: '40', nomeEvento: 'Concert' });
        const res = createRes();
        await (0, EventoController_1.alterarEvento)(req, res);
        (0, globals_1.expect)(res.status).toHaveBeenCalledWith(201);
    });
    (0, globals_1.it)('evento fluxo integrado', async () => {
        const req = { body: { nomeEvento: 'Festival', tipo_Evento: 'Musica' }, file: undefined };
        cadastrarEventoMock.mockResolvedValueOnce({ id: '50', nomeEvento: 'Festival' });
        const res = createRes();
        await (0, EventoController_1.cadastrarEvento)(req, res);
        (0, globals_1.expect)(res.status).toHaveBeenCalledWith(201);
    });
});
//# sourceMappingURL=listarEvento.spec.js.map