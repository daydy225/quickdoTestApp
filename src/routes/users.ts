import { isAuthenticated, isUserAdmin } from '../utils/middleware'
import { createAdmin, deleteUser, getAllUsers, updateUser } from '../controllers/users'
import express from 'express'

export default (router: express.Router) => {
  router.get('/users', getAllUsers)
  router.post('/users', isAuthenticated, isUserAdmin, createAdmin)
  router.delete('/users/:user/destroy', isAuthenticated, isUserAdmin, deleteUser)
  router.put('/users/:user', isAuthenticated, isUserAdmin, updateUser)
}
