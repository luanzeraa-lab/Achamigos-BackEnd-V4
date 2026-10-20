"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SessionsController_1 = require("../controllers/SessionsController");
const express_1 = require("express");
const router = (0, express_1.Router)();
const SessionsController = new SessionsController_1.sessionsController();
router.post("/sessions", SessionsController.create);
exports.default = router;
//# sourceMappingURL=SessionsRoute.js.map