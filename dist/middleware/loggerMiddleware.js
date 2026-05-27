"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = loggerMiddleware;
const logger_1 = require("../utils/logger");
async function loggerMiddleware(req, res, next) {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        logger_1.logger.info("HTTP Request", {
            type: "http_request",
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration: duration,
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers
        });
    });
    next();
}
//# sourceMappingURL=loggerMiddleware.js.map