import { UserModel } from '../models/user'

export const getUsers = () => UserModel.find()

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user: { toObject: () => any }) => user.toObject())

export const getUserByEmail = (email: string) => UserModel.findOne({ email })

export const getUserById = (id: string) => UserModel.findById({ _id: id })

export const getUserByToken = (token: string) => UserModel.findOne({ token })

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })

export const updateAdminStatus = (id: string) => UserModel.updateOne({ _id: id }, { admin: true })

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values, { new: true })
