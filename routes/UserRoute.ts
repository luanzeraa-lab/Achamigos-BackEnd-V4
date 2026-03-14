import express, { Router } from 'express'
import * as userController from '../controllers/UserController'

const router: Router = express.Router()

router.get('/users', userController.listarUser)
// router.post('/users', userController.cadastrarUser)
router.put('/users/:id', userController.alterarUser)
router.delete('/users/:id', userController.excluirUser)

export default router
