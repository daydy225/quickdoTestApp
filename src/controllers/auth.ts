import express from 'express'
import { createUser, getUserByEmail, getUserById } from '../services/user'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/config'
// for user account activation
export const activeUser = async (req: express.Request, res: express.Response) => {
  try {
    const { user } = req.params
    const existingUser = await getUserById(user)

    if (!existingUser) return res.status(404).json({ message: 'User does not exist' })

    existingUser.active = true

    await existingUser.save()

    return res.status(200).json(existingUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: 'Please fill all fields' })

    const user = await getUserByEmail(email)
    if (!user) return res.status(404).json({ message: 'User does not exist' })

    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    user.token = jwt.sign({ id: user._id, email }, JWT_SECRET, { expiresIn: '1h' })

    await user.save()
    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { firstname, lastname, email, phone, password } = req.body
    console.log(req.body)

    if (!firstname || !lastname || !email || !phone || !password)
      return res.status(400).json({ message: 'Please fill all fields' })

    const existingUser = await getUserByEmail(email)
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    const saltRounds = 10
    const salt = await bcryptjs.genSalt(saltRounds)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const user = await createUser({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
    })

    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
