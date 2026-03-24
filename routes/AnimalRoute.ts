import express, { Router } from 'express'
import multer from 'multer'
import * as animalController from '../controllers/AnimalController'

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

router.get('/animais/:id', animalController.buscarAnimalPorId)
router.get('/animais', animalController.listarAnimal)
router.post('/animais', upload.single('imagem'), animalController.cadastrarAnimal)
router.put('/animais/:id', animalController.alterarAnimal)
router.delete('/animais/:id', animalController.excluirAnimal)
// router.get('/animais', animalController.main())

export default router
