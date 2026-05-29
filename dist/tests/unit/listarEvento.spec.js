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
const EventoController_1 = require("../../controllers/EventoController");
const EventoModel = __importStar(require("../../models/EventoModel"));
describe("listarEvento unit test", () => {
    it("should return 200 when events exist", async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.spyOn(EventoModel, "listarEvento").mockResolvedValue([
            { nomeEvento: "Show" }
        ]);
        await (0, EventoController_1.listarEvento)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
describe("cadastrarEvento unit test", () => {
    it("should return 201 when event is created", async () => {
        const req = {
            body: {
                nomeEvento: "Show",
                data: "2025-10-10",
                tipo_Evento: "Musica",
                texto: "Evento musical"
            },
            file: null
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.spyOn(EventoModel, "cadastrarEvento").mockResolvedValue({
            id: 1,
            nomeEvento: "Show"
        });
        await (0, EventoController_1.cadastrarEvento)(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
    });
});
//# sourceMappingURL=listarEvento.spec.js.map