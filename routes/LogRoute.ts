import { Router } from "express";
import { logger } from "../utils/logger";
import { logtail } from "../config/loggerConfig";

const router = Router();

router.get("/log", async (req, res) => {
  console.log("🔥 ENTROU NA ROTA LOG");

  await logger.info("Teste manual", { ok: true });

  // await logtail.flush(); 

  res.send("ok");
});

router.get("/erro", (req, res) => {
  res.status(500).json({ error: "Erro teste" });
});

router.get('/lento', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  res.send('ok');
});

export default router;