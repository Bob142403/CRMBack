import { Router } from 'express'
import { verifyToken } from '../middlewares/verify-token.ts'
import UsersController from './users.controller.ts'

export const PRIVATE_KEY = 'SHHHHH'

const { addUser, getUserById, updateUser, deleteUser, getUsers } =
  new UsersController()

const router = Router()
  .use(verifyToken)
  .post('/', addUser)
  .delete('/:id', deleteUser)
  .put('/:id', updateUser)
  .get('/', getUsers)
  .get('/:id', getUserById)

export default router
