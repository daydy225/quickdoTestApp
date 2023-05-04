"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    country: { type: String, default: "Côte d'Ivoire" },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, true: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    phone: { type: String, default: '' },
    password: { type: String, required: true, select: true },
    token: { type: String, select: false },
    admin: { type: Boolean, default: false },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    visible: { type: Boolean, default: true },
    active: { type: Boolean, default: false },
    businesses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Business' }],
    beneficiaries: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Beneficiary' }],
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.js.map