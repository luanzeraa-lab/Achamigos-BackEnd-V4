"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirEvento = exports.alterarEvento = exports.cadastrarEvento = exports.listarEvento = exports.Evento = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EventoSchema = new mongoose_1.default.Schema({
    nomeEvento: { type: String, required: false },
    data: { type: Date, default: Date.now },
    tipo_Evento: { type: String },
    texto: { type: String },
    linkEvento: { type: String },
    imagem: { type: String },
});
const Evento = mongoose_1.default.model('Evento', EventoSchema);
exports.Evento = Evento;
const listarEvento = async () => {
    return await Evento.find();
};
exports.listarEvento = listarEvento;
const cadastrarEvento = async (dados, file) => {
    const newEvento = new Evento({
        tipo_Evento: dados.tipo_Evento,
        texto: dados.texto,
        data: dados.data,
        linkEvento: dados.linkEvento,
        nomeEvento: dados.nomeEvento || dados.tipo_Evento,
        imagem: file ? `/public/${file.filename}` : null,
    });
    return await newEvento.save();
};
exports.cadastrarEvento = cadastrarEvento;
const alterarEvento = async (id, dados) => {
    return await Evento.findByIdAndUpdate(id, dados, { new: true });
};
exports.alterarEvento = alterarEvento;
const excluirEvento = async (id) => {
    return await Evento.findByIdAndDelete(id);
};
exports.excluirEvento = excluirEvento;
//# sourceMappingURL=EventoModel.js.map