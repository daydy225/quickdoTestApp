"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./utils/config");
const logger_1 = require("./utils/logger");
const routes_1 = __importDefault(require("./routes"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const middleware_1 = require("./utils/middleware");
const app = (0, express_1.default)();
// info('connecting to', MONGO_URI)
app.use((0, compression_1.default)());
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to QuickDo Test API by Daydy Dev version 1.0.0' });
});
app.use('/api', (0, routes_1.default)());
mongoose_1.default
    .connect(config_1.MONGO_URI)
    .then((result) => (0, logger_1.info)('connected to MongoDB'))
    .catch((err) => (0, logger_1.error)('error connecting to MongoDB', err.message));
app.use(middleware_1.unknownEndpoint);
exports.default = app;
//# sourceMappingURL=app.js.map