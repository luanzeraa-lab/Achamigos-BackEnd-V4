import express, { Router } from 'express'
import multer from 'multer'
import * as EventoController from '../controllers/EventoController'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary'


const router: Router = express.Router()

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'achamigos_eventos',
    public_id: Date.now().toString(),
  }),
})
const upload = multer({ storage })

router.get('/eventos', EventoController.listarEvento)
router.post('/eventos', upload.single('imagem'), EventoController.cadastrarEvento)
router.put('/eventos/:id', EventoController.alterarEvento)
router.delete('/eventos/:id', EventoController.excluirEvento)

export default router
