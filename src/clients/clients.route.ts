import { Router } from 'express'
import ClientsController from './clients.controller.ts'
import { verifyToken } from '../middlewares/verify-token.ts'

const { addClient, deleteClient, getClientById, getClients, updateClient } =
  new ClientsController()

const router = Router()
  .use(verifyToken)
  .post('/', addClient)
  .delete('/:id', deleteClient)
  .get('/', getClients)
  .get('/:id', getClientById)
  .put('/:id', updateClient)

export default router
