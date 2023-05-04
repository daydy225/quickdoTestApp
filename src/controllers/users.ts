import express from 'express'
import { createUser, deleteUserById, getUsers, updateAdminStatus, updateUserById } from '../services/user'
import bcryptjs from 'bcryptjs'

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers()

    return res.status(200).json(users).end()
  } catch (error) {
    console.error(error)
    res.sendStatus(400)
  }
}

export const createAdmin = async (req: express.Request, res: express.Response) => {
  try {
    if (!req.body.password) return res.status(400).json({ error: 'Password is required' })

    const saltRounds = 10
    const salt = await bcryptjs.genSalt(saltRounds)
    const hashedPassword = await bcryptjs.hash(req.body.password, salt)

    const createdAdmin = await createUser({
      ...req.body,
      role: 'admin',
      password: hashedPassword,
    })

    await updateAdminStatus(createdAdmin._id)

    return res.status(200).json(createdAdmin).end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { user } = req.params
    await deleteUserById(user)

    return res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { user } = req.params
    const userToUpdate = await updateUserById(user, req.body)

    return res.status(200).json(userToUpdate).end()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
