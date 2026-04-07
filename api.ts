import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response, Application } from 'express'
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import cors from 'cors'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'

import animalRoute from './routes/AnimalRoute'
import userRoute from './routes/UserRoute'
import eventoRoute from './routes/EventoRoute'
import filtroRoute from './routes/FiltroRoute'
import GenaiRoute from './routes/GenaiRoute'
import apiKeyAuth from './middleware/apiKeyAuth'
import swaggerDocument from './swagger-output.json'

const app: Application = express()

app.use(express.json())
app.use(cors({ origin: '*' }))
app.use('/public', express.static('public'))
app.use(loggerMiddleware);

// Rotas básicas
app.get('/', (req: Request, res: Response) => {
  res.json({ message: '🚀 Api Achamigos rodando com sucesso!' })
})

// Swagger UI
const swaggerOptions = {
  customCssUrl: '/public/custom.css',
  customSiteTitle: 'API Achamigos',
  customfavIcon: '/public/fav2.png',
}
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions))

app.use('/api', GenaiRoute)
// Rotas da API
app.use(apiKeyAuth)
app.use('/api', animalRoute)
app.use('/api', userRoute)
app.use('/api', eventoRoute)
app.use('/api', filtroRoute)
app.use(errorMiddleware);

// Conexão MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('✅ Conexão com o banco de dados bem-sucedida!'))
  .catch((err) => console.log('❌ Erro ao conectar ao banco de dados:', err))

// Inicialização do servidor
const port = process.env.PORT || 3002
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`)
})

export {app}

