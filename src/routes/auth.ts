import { register, login, activeUser } from '../controllers/auth'
import express from 'express'
import { check } from 'express-validator'

export default (router: express.Router) => {
  router.post(
    '/auth/register',
    [
      check('firstname').isLength({ min: 3, max: 20 }).escape(),
      check('lastname').isLength({ min: 3, max: 20 }).escape(),
      check('password').isLength({ min: 6, max: 20 }),
      check('email').isEmail().normalizeEmail(),
      check('phone')
        .isLength({ min: 10, max: 20 })
        .escape()
        .withMessage('Phone number must be between 10 and 20 digits'),
    ],
    register,
  )
  router.post('/auth/login', login)
  router.post('/auth/activate/:user', activeUser)
}
