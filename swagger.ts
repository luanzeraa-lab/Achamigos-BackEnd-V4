import swaggerAutogen from 'swagger-autogen'
import dotenv from 'dotenv'
import packageJson from './package.json'
dotenv.config()

const doc = {
  info: {
    title: 'API Achamigos',
    description: 'Documentação da API Achamigos usando Swagger',
    version: packageJson.version,
  },
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
  './routes/GenaiRoute.ts',
]

swaggerAutogen()(outputFile, endpointsFiles, doc)
