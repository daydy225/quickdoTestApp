import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config'
import { getUserByToken } from '../services/user'
import { get, merge } from 'lodash'

export const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

export const isUserAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const currentUserRole = get(req, 'identity.role') as string
  console.log('🚀 ~ file: middleware.ts:13 ~ isUserAdmin ~ currentUserRole:', currentUserRole)

  if (currentUserRole !== 'admin') return res.status(400).json({ message: 'Bad request' })

  next()
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  const decodedToken = jwt.verify(token, JWT_SECRET)
  console.log('🚀 ~ file: middleware.ts:30 ~ isAuthenticated ~ decodedToken:', decodedToken)
  if (!decodedToken) return res.status(401).json({ message: 'Unauthorized' })

  const user = await getUserByToken(token)

  merge(req, { identity: user })

  next()
}
