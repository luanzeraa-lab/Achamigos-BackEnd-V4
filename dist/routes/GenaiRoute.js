"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GenaiController_1 = require("../controllers/GenaiController");
const router = express_1.default.Router();
router.post("/gerartexto", GenaiController_1.gerarTextoController);
exports.default = router;
//# sourceMappingURL=GenaiRoute.js.map