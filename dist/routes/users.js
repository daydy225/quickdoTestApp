"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = require("../utils/middleware");
const users_1 = require("../controllers/users");
exports.default = (router) => {
    router.get('/users', users_1.getAllUsers);
    router.post('/users', middleware_1.isAuthenticated, middleware_1.isAdmin, users_1.createAdmin);
    router.delete('/users/:user/destroy', middleware_1.isAuthenticated, middleware_1.isAdmin, users_1.deleteUser);
    router.put('/users/:user', middleware_1.isAuthenticated, middleware_1.isAdmin, users_1.updateUser);
};
//# sourceMappingURL=users.js.map