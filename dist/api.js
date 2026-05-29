"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
require("dotenv/config");
const dns_1 = __importDefault(require("dns"));
if (process.env.DNS_FORCE === 'true') {
    dns_1.default.setServers(["1.1.1.1", "8.8.8.8"]);
}
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const loggerMiddleware_1 = require("./middleware/loggerMiddleware");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const AnimalRoute_1 = __importDefault(require("./routes/AnimalRoute"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const EventoRoute_1 = __importDefault(require("./routes/EventoRoute"));
const FiltroRoute_1 = __importDefault(require("./routes/FiltroRoute"));
const GenaiRoute_1 = __importDefault(require("./routes/GenaiRoute"));
const LogRoute_1 = __importDefault(require("./routes/LogRoute"));
const swagger_output_json_1 = __importDefault(require("./swagger-output.json"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
app.use('/public', express_1.default.static('public'));
app.use(loggerMiddleware_1.loggerMiddleware);
app.get('/', (req, res) => {
    res.json({ message: '🚀 Api Achamigos rodando com sucesso!' });
});
const swaggerOptions = {
    customCssUrl: '/public/custom.css',
    customSiteTitle: 'API Achamigos',
    customfavIcon: '/public/fav2.png',
};
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default, swaggerOptions));
app.use('/api', GenaiRoute_1.default);
app.use('/api', LogRoute_1.default);
app.use('/api', AnimalRoute_1.default);
app.use('/api', UserRoute_1.default);
app.use('/api', EventoRoute_1.default);
app.use('/api', FiltroRoute_1.default);
app.use(errorMiddleware_1.errorMiddleware);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conexão com o banco de dados bem-sucedida!'))
    .catch((err) => console.log('❌ Erro ao conectar ao banco de dados:', err));
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
});
//# sourceMappingURL=api.js.map