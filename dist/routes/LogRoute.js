"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
router.get("/log", async (req, res) => {
    console.log("🔥 ENTROU NA ROTA LOG");
    await logger_1.logger.info("Teste manual", { ok: true });
    res.send("ok");
});
router.get("/erro", (req, res) => {
    res.status(500).json({ error: "Erro teste" });
});
router.get('/lento', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    res.send('ok');
});
exports.default = router;
//# sourceMappingURL=LogRoute.js.map