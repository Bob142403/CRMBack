import { Router } from 'express'
import Auth from './auth.controller.ts'

const { signIn, signUp, auth } = new Auth()

const router = Router()
  .post('/login', signIn)
  .post('/sign-up', signUp)
  .get('/auth', auth)

export default router
