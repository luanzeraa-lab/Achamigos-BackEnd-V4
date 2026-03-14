import swaggerAutogen from 'swagger-autogen'
import dotenv from 'dotenv'

dotenv.config()

const doc = {
  info: {
    title: 'API Achamigos',
    description: 'Documentação da API Achamigos usando Swagger',
  },
  host: 'localhost:3002',
  schemes: ['http'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'x-api-key',
      description: process.env.API_KEY,
    },
  },
  security: [
    {
      apiKeyAuth: [],
    },
  ],
}

const outputFile = './swagger-output.json'
const endpointsFiles = [
  './api.ts',
  './routes/UserRoute.ts',
  './routes/AnimalRoute.ts',
  './routes/FiltroRoute.ts',
  './routes/EventoRoute.ts',
]

swaggerAutogen()(outputFile, endpointsFiles, doc)
