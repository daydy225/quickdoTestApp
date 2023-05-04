"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./utils/config");
const logger_1 = require("./utils/logger");
const server = http_1.default.createServer(app_1.default);
server.listen(config_1.PORT, () => {
    (0, logger_1.info)(`Server is running on  http://localhost:${config_1.PORT}/`);
});
//# sourceMappingURL=index.js.map