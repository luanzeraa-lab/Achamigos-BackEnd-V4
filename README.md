# API Achamigos - Backend TypeScript

API para gerenciamento de animais, usuários e eventos da plataforma Achamigos.

## Tecnologias

- **Node.js** com **TypeScript**
- **Express.js** - Framework web
- **MongoDB** com **Mongoose** - Banco de dados
- **Swagger** - Documentação da API
- **Multer** - Upload de arquivos
- **Bcrypt** - Criptografia de senhas

## Estrutura do Projeto

```
├── api.ts                  # Arquivo principal da aplicação
├── tsconfig.json          # Configuração do TypeScript
├── swagger.ts             # Configuração do Swagger
├── controllers/           # Controladores da aplicação
├── models/               # Modelos do MongoDB
├── routes/               # Rotas da API
├── middleware/           # Middlewares (autenticação, etc)
├── services/             # Serviços (lógica de negócio)
├── types/                # Interfaces e tipos TypeScript
├── public/               # Arquivos estáticos (imagens)
└── dist/                 # Código compilado (gerado automaticamente)
```

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
MONGO_URI=sua_connection_string_mongodb
API_KEY=sua_chave_api
PORT=3002
```

## Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor em modo de desenvolvimento usando `ts-node` (não precisa compilar).

### Build
```bash
npm run build
```
Compila o TypeScript para JavaScript na pasta `dist/`.

### Produção
```bash
npm start
```
Inicia o servidor a partir do código compilado em `dist/`.

## Documentação da API

Acesse a documentação Swagger após iniciar o servidor:
```
http://localhost:3002/docs
```

## Endpoints Principais

### Animais
- `GET /api/animais` - Lista todos os animais
- `GET /api/animais/:id` - Busca um animal por ID
- `POST /api/animais` - Cadastra um novo animal 
- `PUT /api/animais/:id` - Atualiza um animal
- `DELETE /api/animais/:id` - Remove um animal
- `GET /api/animais/buscar` - Filtra animais por parâmetros

### Usuários
- `GET /api/users` - Lista todos os usuários
- `PUT /api/users/:id` - Atualiza um usuário
- `DELETE /api/users/:id` - Remove um usuário

### Eventos
- `GET /api/eventos` - Lista todos os eventos
- `POST /api/eventos` - Cadastra um novo evento 
- `PUT /api/eventos/:id` - Atualiza um evento
- `DELETE /api/eventos/:id` - Remove um evento

## Autenticação

Todas as rotas da API requerem autenticação via API Key.

Adicione o header em todas as requisições:
```
x-api-key: SUA_API_KEY
```


