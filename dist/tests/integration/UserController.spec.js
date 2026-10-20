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
const globals_1 = require("@jest/globals");
const UserController_1 = require("../../controllers/UserController");
const UserModel = __importStar(require("../../models/UserModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
globals_1.jest.mock('../../models/UserModel', () => ({
    User: {
        findOne: globals_1.jest.fn(),
    },
    listarUser: globals_1.jest.fn(),
    criarUser: globals_1.jest.fn(),
    alterarUser: globals_1.jest.fn(),
    excluirUser: globals_1.jest.fn(),
}));
globals_1.jest.mock('bcryptjs', () => ({
    hashSync: globals_1.jest.fn(() => 'hashed_password'),
    compare: globals_1.jest.fn(),
}));
const createRes = () => ({
    status: globals_1.jest.fn().mockReturnThis(),
    json: globals_1.jest.fn(),
});
const findOneMock = UserModel.User.findOne;
const listarUserMock = UserModel.listarUser;
const criarUserMock = UserModel.criarUser;
const alterarUserMock = UserModel.alterarUser;
const excluirUserMock = UserModel.excluirUser;
const compareMock = bcryptjs_1.default.compare;
const hashSyncMock = bcryptjs_1.default.hashSync;
(0, globals_1.describe)('UserController', () => {
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.it)('retorna erro quando usuario nao e encontrado no login', async () => {
        const req = { body: { email: 'naoexiste@teste.com', senha: '123456' } };
        const res = createRes();
        findOneMock.mockResolvedValue(null);
        await (0, UserController_1.login)(req, res);
        (0, globals_1.expect)(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Usuário não encontrado',
        });
    });
    (0, globals_1.it)('retorna erro quando a senha esta incorreta', async () => {
        const req = { body: { email: 'user@teste.com', senha: 'senhaerrada' } };
        const res = createRes();
        findOneMock.mockResolvedValue({ senha: 'senha_hash', toObject: globals_1.jest.fn() });
        compareMock.mockResolvedValue(false);
        await (0, UserController_1.login)(req, res);
        (0, globals_1.expect)(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Senha ou Email incorretos',
        });
    });
    (0, globals_1.it)('retorna sucesso no login', async () => {
        const userObject = {
            _id: '1',
            nome: 'Pet Shop',
            email: 'user@teste.com',
            senha: 'senha_hash',
        };
        const req = { body: { email: 'user@teste.com', senha: 'senha_certa' } };
        const res = createRes();
        findOneMock.mockResolvedValue({ senha: 'senha_hash', toObject: () => userObject });
        compareMock.mockResolvedValue(true);
        await (0, UserController_1.login)(req, res);
        (0, globals_1.expect)(res.json).toHaveBeenCalledWith({
            status: 'success',
            user: { _id: '1', nome: 'Pet Shop', email: 'user@teste.com' },
            message: 'Login realizado com sucesso',
        });
    });
    (0, globals_1.it)('retorna erro no login quando ocorre excecao', async () => {
        const req = { body: { email: 'user@teste.com', senha: 'senha_certa' } };
        const res = createRes();
        findOneMock.mockRejectedValue(new Error('falha no banco'));
        await (0, UserController_1.login)(req, res);
        (0, globals_1.expect)(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Erro no servidor',
        });
    });
    (0, globals_1.it)('listar: sucesso, vazio e erro', async () => {
        const req = {};
        listarUserMock.mockResolvedValueOnce([{ id: '1', nome: 'Loja' }]);
        const res1 = createRes();
        await (0, UserController_1.listarUser)(req, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(200);
        listarUserMock.mockResolvedValueOnce(null);
        const res2 = createRes();
        await (0, UserController_1.listarUser)(req, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(404);
        listarUserMock.mockRejectedValueOnce(new Error('erro'));
        const res3 = createRes();
        await (0, UserController_1.listarUser)(req, res3);
        (0, globals_1.expect)(res3.status).toHaveBeenCalledWith(400);
    });
    (0, globals_1.it)('cadastro: validações e erro', async () => {
        const req1 = { body: { nome: 'Pet Shop' } };
        const res1 = createRes();
        await (0, UserController_1.cadastrarUser)(req1, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(400);
        const body = { nome: 'Pet Shop', cnpj: '12.345.678/0001-99', telefone: '11999999999', userLogin: 'petshop', senha: 'senha123', email: 'contato@teste.com' };
        listarUserMock.mockResolvedValueOnce([{ email: 'contato@teste.com', userLogin: 'outro' }]);
        const req2 = { body };
        const res2 = createRes();
        await (0, UserController_1.cadastrarUser)(req2, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(400);
        listarUserMock.mockResolvedValueOnce([{ email: 'outro@teste.com', userLogin: 'petshop' }]);
        const req3 = { body };
        const res3 = createRes();
        await (0, UserController_1.cadastrarUser)(req3, res3);
        (0, globals_1.expect)(res3.status).toHaveBeenCalledWith(400);
    });
    (0, globals_1.it)('cadastro sucesso e erro', async () => {
        listarUserMock.mockResolvedValueOnce([]);
        criarUserMock.mockResolvedValueOnce({ id: '1', nome: 'Pet Shop', email: 'contato@teste.com' });
        const req1 = { body: { nome: 'Pet Shop', cnpj: '12.345.678/0001-99', telefone: '11999999999', userLogin: 'petshop', senha: 'senha123', email: 'contato@teste.com' }, file: undefined };
        const res1 = createRes();
        await (0, UserController_1.cadastrarUser)(req1, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(201);
        listarUserMock.mockResolvedValueOnce([]);
        criarUserMock.mockRejectedValueOnce(new Error('erro'));
        const res2 = createRes();
        await (0, UserController_1.cadastrarUser)(req1, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(500);
    });
    (0, globals_1.it)('alterar: com hash, vazio, vazio e erro', async () => {
        alterarUserMock.mockResolvedValueOnce({ id: '2', nome: 'Atualizado' });
        const req1 = { params: { id: '2' }, body: { nome: 'Atualizado', senha: 'novaSenha' } };
        const res1 = createRes();
        await (0, UserController_1.alterarUser)(req1, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(200);
        alterarUserMock.mockResolvedValueOnce({ id: '2', nome: 'Atualizado' });
        const req2 = { params: { id: '2' }, body: { nome: 'Atualizado', senha: '   ' } };
        const res2 = createRes();
        await (0, UserController_1.alterarUser)(req2, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(200);
        alterarUserMock.mockResolvedValueOnce(null);
        const req3 = { params: { id: '2' }, body: { nome: 'Atualizado' } };
        const res3 = createRes();
        await (0, UserController_1.alterarUser)(req3, res3);
        (0, globals_1.expect)(res3.status).toHaveBeenCalledWith(400);
        alterarUserMock.mockRejectedValueOnce(new Error('erro'));
        const res4 = createRes();
        await (0, UserController_1.alterarUser)(req3, res4);
        (0, globals_1.expect)(res4.status).toHaveBeenCalledWith(400);
    });
    (0, globals_1.it)('excluir: sucesso, vazio e erro', async () => {
        const req = { params: { id: '3' } };
        excluirUserMock.mockResolvedValueOnce({ id: '3' });
        const res1 = createRes();
        await (0, UserController_1.excluirUser)(req, res1);
        (0, globals_1.expect)(res1.status).toHaveBeenCalledWith(200);
        excluirUserMock.mockResolvedValueOnce(null);
        const res2 = createRes();
        await (0, UserController_1.excluirUser)(req, res2);
        (0, globals_1.expect)(res2.status).toHaveBeenCalledWith(400);
        excluirUserMock.mockRejectedValueOnce(new Error('erro'));
        const res3 = createRes();
        await (0, UserController_1.excluirUser)(req, res3);
        (0, globals_1.expect)(res3.status).toHaveBeenCalledWith(400);
    });
});
//# sourceMappingURL=UserController.spec.js.map