"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const dotenv_1 = __importDefault(require("dotenv"));
const package_json_1 = __importDefault(require("./package.json"));
dotenv_1.default.config();
const doc = {
    info: {
        title: 'API Achamigos',
        description: 'Documentação da API Achamigos usando Swagger',
        version: package_json_1.default.version,
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
};
const outputFile = './swagger-output.json';
const endpointsFiles = [
    './api.ts',
];
const options = {
    openapi: '3.0.0',
    language: 'pt-BR',
};
(0, swagger_autogen_1.default)(options)(outputFile, endpointsFiles, doc).then(() => {
    console.log("Swagger gerado com sucesso!");
});
//# sourceMappingURL=swagger.js.map