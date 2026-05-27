import express from "express";
import { gerartextoController } from "../controllers/GenaiController";

const router = express.Router();

router.post("/gerartexto", gerartextoController);

export default router;