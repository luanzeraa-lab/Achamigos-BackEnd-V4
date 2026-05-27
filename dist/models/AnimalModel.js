"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filtrarAnimais = exports.buscarAnimalPorId = exports.listarAnimais = exports.excluirAnimal = exports.alterarAnimal = exports.cadastrarAnimal = exports.Animal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel_1 = require("./UserModel");
const AnimalSchema = new mongoose_1.default.Schema({
    nome: { type: String, required: true },
    idade: { type: Number },
    raca: { type: String, required: true },
    sexo: { type: String, required: true },
    porte: { type: String, required: true },
    peso: { type: Number },
    observacoes: { type: String },
    linkAnimal: { type: String },
    castracao: { type: Boolean, required: true },
    imagem: { type: String },
    tipo: { type: String, required: true },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
const Animal = mongoose_1.default.model('Animal', AnimalSchema);
exports.Animal = Animal;
const listarAnimais = async () => {
    return await Animal.find();
};
exports.listarAnimais = listarAnimais;
const buscarAnimalPorId = async (id) => {
    return await Animal.findById(id);
};
exports.buscarAnimalPorId = buscarAnimalPorId;
const cadastrarAnimal = async (dados, file) => {
    const novoAnimal = new Animal({
        ...dados,
        imagem: file ? `/public/${file.filename}` : null,
    });
    return await novoAnimal.save();
};
exports.cadastrarAnimal = cadastrarAnimal;
const alterarAnimal = async (id, dados) => {
    return await Animal.findByIdAndUpdate(id, dados, { new: true });
};
exports.alterarAnimal = alterarAnimal;
const excluirAnimal = async (id) => {
    return await Animal.findByIdAndDelete(id);
};
exports.excluirAnimal = excluirAnimal;
const filtrarAnimais = async (filtros = {}) => {
    const { tipo, porte, cidade, castrado, idade } = filtros;
    const query = {};
    if (cidade) {
        const usuarios = await UserModel_1.User.find({ 'endereco.cidade': cidade });
        if (!usuarios.length)
            return [];
        query.userId = { $in: usuarios.map((user) => user._id) };
    }
    if (tipo)
        query.tipo = tipo;
    if (porte)
        query.porte = porte;
    if (castrado !== undefined)
        query.castracao = castrado;
    if (idade)
        query.idade = idade;
    return await Animal.find(query);
};
exports.filtrarAnimais = filtrarAnimais;
//# sourceMappingURL=AnimalModel.js.map