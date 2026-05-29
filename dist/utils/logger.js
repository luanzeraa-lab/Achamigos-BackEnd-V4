"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const loggerConfig_1 = require("../config/loggerConfig");
exports.logger = {
    info: async (message, data) => {
        await loggerConfig_1.logtail.info(message, data);
    },
    error: async (message, error) => {
        await loggerConfig_1.logtail.error(message, error);
    }
};
//# sourceMappingURL=logger.js.map