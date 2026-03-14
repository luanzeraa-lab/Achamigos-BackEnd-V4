import express, { Router } from 'express'
import * as FiltroController from '../controllers/FiltroController'

const router: Router = express.Router()

router.get('/animais/buscar', FiltroController.filtrarAnimais)

export default router
