"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logtail = void 0;
const node_1 = require("@logtail/node");
exports.logtail = new node_1.Logtail(process.env.LOGTAIL_SOURCE_TOKEN);
//# sourceMappingURL=loggerConfig.js.map