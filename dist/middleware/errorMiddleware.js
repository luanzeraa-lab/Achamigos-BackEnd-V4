"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const logger_1 = require("../utils/logger");
function errorMiddleware(err, req, res, next) {
    logger_1.logger.error("Erro não tratado", {
        message: err.message,
        stack: err.stack,
        url: req.originalUrl
    });
    res.status(500).json({
        message: "Erro interno do servidor"
    });
}
//# sourceMappingURL=errorMiddleware.js.map