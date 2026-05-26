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
]

const options = {
  openapi: '3.0.0', 
  language: 'pt-BR',
};

swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger gerado com sucesso!");
});
