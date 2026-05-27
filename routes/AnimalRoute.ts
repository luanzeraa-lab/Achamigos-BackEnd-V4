import express, { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import * as animalController from '../controllers/AnimalController'

const router: Router = express.Router()

const uploadPath = path.resolve('public')

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage })

router.get('/animais/:id', animalController.buscarAnimalPorId)
router.get('/animais', animalController.listarAnimal)
router.post('/animais', upload.single('imagem'), animalController.cadastrarAnimal)
router.put('/animais/:id', animalController.alterarAnimal)
router.delete('/animais/:id', animalController.excluirAnimal)


export default router
