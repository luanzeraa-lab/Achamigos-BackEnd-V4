import { sessionsController } from "../controllers/SessionsController";
import { Router } from "express";

const router = Router()
const SessionsController = new sessionsController()

router.post("/sessions", SessionsController.create)

export default router