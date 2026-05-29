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
exports.excluirUser = exports.alterarUser = exports.cadastrarUser = exports.listarUser = exports.login = void 0;
const UserModel_1 = require("../models/UserModel");
const UserModel = __importStar(require("../models/UserModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await UserModel_1.User.findOne({ email });
        if (!user) {
            return res.json({
                status: "error",
                message: "Usuário não encontrado",
            });
        }
        const senhaCorreta = await bcryptjs_1.default.compare(senha, user.senha);
        if (!senhaCorreta) {
            return res.json({
                status: "error",
                message: "Senha ou Email incorretos",
            });
        }
        const userObj = user.toObject();
        delete userObj.senha;
        return res.json({
            status: "success",
            user: userObj,
            message: "Login realizado com sucesso",
        });
    }
    catch (error) {
        console.error(error);
        return res.json({
            status: "error",
            message: "Erro no servidor",
        });
    }
};
exports.login = login;
const listarUser = async (req, res) => {
    try {
        const users = await UserModel.listarUser();
        if (!users) {
            res.status(404).json({ message: 'Nenhum usuário encontrado' });
            return;
        }
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.listarUser = listarUser;
const cadastrarUser = async (req, res) => {
    try {
        const userData = { ...req.body };
        if (!userData.nome || !userData.cnpj || !userData.telefone || !userData.userLogin || !userData.senha || !userData.email) {
            res.status(400).json({ message: 'Campos obrigatórios não informados' });
            return;
        }
        const users = await UserModel.listarUser();
        if (users?.some((u) => u.email === userData.email)) {
            res.status(400).json({ message: 'E-mail já cadastrado' });
            return;
        }
        if (users?.some((u) => u.userLogin === userData.userLogin)) {
            res.status(400).json({ message: 'Login já cadastrado' });
            return;
        }
        userData.senha = bcryptjs_1.default.hashSync(userData.senha, 10);
        const newUser = await UserModel.criarUser(userData, req.file);
        const userObj = newUser?.toObject ? newUser.toObject() : { ...newUser };
        delete userObj.senha;
        delete userObj.__v;
        res.status(201).json(userObj);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.cadastrarUser = cadastrarUser;
const alterarUser = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = { ...req.body };
        if (dadosAtualizados.senha && dadosAtualizados.senha.trim() !== '') {
            dadosAtualizados.senha = bcryptjs_1.default.hashSync(dadosAtualizados.senha, 10);
        }
        const usuarioAtualizado = await UserModel.alterarUser(id, dadosAtualizados);
        if (!usuarioAtualizado) {
            res.status(400).json({ message: 'Usuário não encontrado' });
            return;
        }
        res.status(200).json(usuarioAtualizado);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.alterarUser = alterarUser;
const excluirUser = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioDeletado = await UserModel.excluirUser(id);
        if (!usuarioDeletado) {
            res.status(400).json({ message: 'Usuário não encontrado' });
            return;
        }
        res.status(200).json(usuarioDeletado);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.excluirUser = excluirUser;
//# sourceMappingURL=UserController.js.map