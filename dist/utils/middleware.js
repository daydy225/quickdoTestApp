"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.isAdmin = exports.unknownEndpoint = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const user_1 = require("../services/user");
const lodash_1 = require("lodash");
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
exports.unknownEndpoint = unknownEndpoint;
const isAdmin = async (req, res, next) => {
    const currentUserRole = (0, lodash_1.get)(req, 'identity.role');
    if (currentUserRole !== 'admin')
        return res.status(400).json({ message: 'Bad request' });
    next();
};
exports.isAdmin = isAdmin;
const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    const decodedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    if (!decodedToken)
        return res.status(401).json({ message: 'Unauthorized' });
    const user = await (0, user_1.getUserByToken)(token);
    (0, lodash_1.merge)(req, { identity: user });
    next();
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=middleware.js.map