import express, { Router } from 'express'
import multer from 'multer'

import * as animalController from '../controllers/AnimalController'

import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary'

const router: Router = express.Router()

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'achamigos',
    public_id: Date.now().toString(),
  }),
})

const upload = multer({ storage })

router.get('/animais/:id', animalController.buscarAnimalPorId)
router.get('/animais', animalController.listarAnimal)
router.post('/animais', upload.single('imagem'), animalController.cadastrarAnimal)
router.put('/animais/:id', animalController.alterarAnimal)
router.delete('/animais/:id', animalController.excluirAnimal)


export default router
