import express, { Router } from 'express';
import multer from 'multer';
import * as EventoController from '../controllers/EventoController';

const router: Router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  }
});
const upload = multer({ storage });

router.get('/eventos', EventoController.listarEvento);
router.post('/eventos', upload.single('imagem'), EventoController.cadastrarEvento);
router.put('/eventos/:id', EventoController.alterarEvento);
router.delete('/eventos/:id', EventoController.excluirEvento);

export default router;
