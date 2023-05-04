import { isAuthenticated, isAdmin } from '../utils/middleware'
import { createAdmin, deleteUser, getAllUsers, updateUser } from '../controllers/users'
import express from 'express'

export default (router: express.Router) => {
  router.get('/users', getAllUsers)
  router.post('/users', isAuthenticated, isAdmin, createAdmin)
  router.delete('/users/:user/destroy', isAuthenticated, isAdmin, deleteUser)
  router.put('/users/:user', isAuthenticated, isAdmin, updateUser)
}
