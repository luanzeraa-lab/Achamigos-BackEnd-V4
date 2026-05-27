"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirUser = exports.alterarUser = exports.listarUser = exports.criarUser = exports.User = void 0;
exports.cadastrarUser = cadastrarUser;
const mongoose_1 = __importDefault(require("mongoose"));
const EnderecoSchema = new mongoose_1.default.Schema({
    cep: { type: String, required: true },
    rua: { type: String, required: true },
    cidade: { type: String, required: true },
    numero: { type: String, required: true },
});
const UserSchema = new mongoose_1.default.Schema({
    nome: { type: String, required: true },
    cnpj: { type: String, required: true },
    telefone: { type: String, required: true },
    userLogin: { type: String, required: true },
    senha: { type: String, required: true },
    email: { type: String, required: true },
    endereco: EnderecoSchema,
    linkUser: { type: String },
});
const User = mongoose_1.default.model('User', UserSchema);
exports.User = User;
const listarUser = async () => {
    return await User.find();
};
exports.listarUser = listarUser;
const criarUser = async (dados, file) => {
    const newUser = new User({
        nome: dados.nome,
        cnpj: dados.cnpj,
        telefone: dados.telefone,
        userLogin: dados.userLogin,
        senha: dados.senha,
        email: dados.email,
        endereco: dados.endereco,
        linkUser: file ? `/public/${file.filename}` : dados.linkUser,
    });
    return await newUser.save();
};
exports.criarUser = criarUser;
const alterarUser = async (id, dados) => {
    return await User.findByIdAndUpdate(id, dados, { new: true });
};
exports.alterarUser = alterarUser;
const excluirUser = async (id) => {
    return await User.findByIdAndDelete(id);
};
exports.excluirUser = excluirUser;
function cadastrarUser() {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=UserModel.js.map