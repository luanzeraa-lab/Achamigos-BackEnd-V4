import express, { Router } from 'express'
import * as FiltroController from '../controllers/FiltroController'

const router: Router = express.Router()

router.get('/animais/filtros/buscar', FiltroController.filtrar)

export default router
