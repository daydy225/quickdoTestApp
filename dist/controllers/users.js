"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.createAdmin = exports.getAllUsers = void 0;
const user_1 = require("../services/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, user_1.getUsers)();
        return res.status(200).json(users).end();
    }
    catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
};
exports.getAllUsers = getAllUsers;
const createAdmin = async (req, res) => {
    try {
        if (!req.body.password)
            return res.status(400).json({ error: 'Password is required' });
        const saltRounds = 10;
        const salt = await bcryptjs_1.default.genSalt(saltRounds);
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, salt);
        const createdAdmin = await (0, user_1.createUser)({
            ...req.body,
            role: 'admin',
            password: hashedPassword,
        });
        await (0, user_1.updateAdminStatus)(createdAdmin._id);
        return res.status(200).json(createdAdmin).end();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createAdmin = createAdmin;
const deleteUser = async (req, res) => {
    try {
        const { user } = req.params;
        await (0, user_1.deleteUserById)(user);
        return res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res) => {
    try {
        const { user } = req.params;
        const userToUpdate = await (0, user_1.updateUserById)(user, req.body);
        return res.status(200).json(userToUpdate).end();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=users.js.map