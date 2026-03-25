import express from "express";
import { gerarTextoController } from "../controllers/GenaiController";

const router = express.Router();

router.post("/gerartexto", gerarTextoController);

export default router;