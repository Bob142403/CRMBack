import { Router } from 'express'
import { verifyToken } from '../middlewares/verify-token.ts'
import UsersController from './users.controller.ts'

export const PRIVATE_KEY = 'SHHHHH'

const {
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  getUsers,
  getUsersByCompanyId,
} = new UsersController()

const router = Router()
  .use(verifyToken)
  .post('/create-user', addUser)
  .delete('/delete-user/:id', deleteUser)
  .put('/update-user/:id', updateUser)
  .get('/list', getUsers)
  .get('/get-user/:id', getUserById)
  .get('/get-users-companyId/:companyId', getUsersByCompanyId)

export default router
