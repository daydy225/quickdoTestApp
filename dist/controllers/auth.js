"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.activeUser = void 0;
const user_1 = require("../services/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
// for user account activation
const activeUser = async (req, res) => {
    try {
        const { user } = req.params;
        const existingUser = await (0, user_1.getUserById)(user);
        if (!existingUser)
            return res.status(404).json({ message: 'User does not exist' });
        existingUser.active = true;
        await existingUser.save();
        return res.status(200).json(existingUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.activeUser = activeUser;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: 'Please fill all fields' });
        const user = await (0, user_1.getUserByEmail)(email);
        if (!user)
            return res.status(404).json({ message: 'User does not exist' });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' });
        user.token = jsonwebtoken_1.default.sign({ id: user._id, email }, config_1.JWT_SECRET, { expiresIn: '1h' });
        await user.save();
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password } = req.body;
        console.log(req.body);
        if (!firstname || !lastname || !email || !phone || !password)
            return res.status(400).json({ message: 'Please fill all fields' });
        const existingUser = await (0, user_1.getUserByEmail)(email);
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });
        const saltRounds = 10;
        const salt = await bcryptjs_1.default.genSalt(saltRounds);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const user = await (0, user_1.createUser)({
            firstname,
            lastname,
            email,
            phone,
            password: hashedPassword,
        });
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.register = register;
//# sourceMappingURL=auth.js.map