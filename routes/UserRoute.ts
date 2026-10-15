import express, { Router } from 'express'
import multer from 'multer'
import * as userController from '../controllers/UserController'
import { ensureAuthenticated } from '../middleware/EnsureAuthenticated'

const router: Router = express.Router()

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + '/../public')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '.jpg')
	},
})

const upload = multer({ storage })

router.get('/users', ensureAuthenticated, userController.listarUser)
router.post('/users', upload.single('imagem'), userController.cadastrarUser)
router.put('/users/:id', ensureAuthenticated, userController.alterarUser)
router.delete('/users/:id', ensureAuthenticated, userController.excluirUser)
router.post('/users/login', userController.login)

export default router
