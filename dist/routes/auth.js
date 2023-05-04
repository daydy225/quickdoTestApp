"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
exports.default = (router) => {
    router.post('/auth/register', [
        (0, express_validator_1.check)('firstname').isLength({ min: 3, max: 20 }).escape(),
        (0, express_validator_1.check)('lastname').isLength({ min: 3, max: 20 }).escape(),
        (0, express_validator_1.check)('password').isLength({ min: 6, max: 20 }),
        (0, express_validator_1.check)('email').isEmail().normalizeEmail(),
        (0, express_validator_1.check)('phone')
            .isLength({ min: 10, max: 20 })
            .escape()
            .withMessage('Phone number must be between 10 and 20 digits'),
    ], auth_1.register);
    router.post('/auth/login', auth_1.login);
    router.post('/auth/activate/:user', auth_1.activeUser);
};
//# sourceMappingURL=auth.js.map