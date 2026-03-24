import express, { Router } from 'express'
import * as IaController from '../controllers/IaController'

const router: Router = express.Router()

router.post('/ia/prompt', IaController.enviarPrompt)
router.get('/ia/historico', IaController.listarHistorico)

export default router