import { Router } from 'express'
import { verifyToken } from '../middlewares/verify-token.ts'
import UsersController from './users.controller.ts'

export const PRIVATE_KEY = 'SHHHHH'

const { addUser, getUserById, updateUser, deleteUser, getUsers } =
  new UsersController()

const router = Router()
  .use(verifyToken)
  .put('/update-user/:id', updateUser)
  .post('/create-user', addUser)
  .delete('/delete-user/:id', deleteUser)
  .get('/list', getUsers)
  .get('/get-user/:id', getUserById)

export default router
