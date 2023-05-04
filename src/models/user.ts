import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
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
    businesses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Business' }],
    beneficiaries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Beneficiary' }],
  },
  { timestamps: true },
)

export const UserModel = mongoose.model('User', userSchema)
