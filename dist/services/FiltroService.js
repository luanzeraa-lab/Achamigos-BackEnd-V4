"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnimalModel_1 = require("../models/AnimalModel");
const UserModel_1 = require("../models/UserModel");
class FiltroService {
    static async filtrarAnimais(filtros = {}) {
        const { tipo, porte, cidade, castrado, idade } = filtros;
        let userIDs = null;
        const animaisFiltrados = {};
        if (cidade) {
            const usuarios = await UserModel_1.User.find({ 'endereco.cidade': cidade });
            if (!usuarios.length) {
                return [];
            }
            userIDs = usuarios.map((user) => user._id);
            animaisFiltrados.userId = { $in: userIDs };
        }
        if (tipo) {
            animaisFiltrados.tipo = tipo;
        }
        if (porte) {
            animaisFiltrados.porte = porte;
        }
        if (castrado !== undefined) {
            animaisFiltrados.castracao = castrado;
        }
        if (idade) {
            animaisFiltrados.idade = idade;
        }
        const animais = await AnimalModel_1.Animal.find(animaisFiltrados);
        return animais;
    }
}
exports.default = FiltroService;
//# sourceMappingURL=FiltroService.js.map