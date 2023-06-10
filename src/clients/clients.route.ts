import { Router } from 'express'
import ClientsController from './clients.controller.ts'
import { verifyToken } from '../middlewares/verify-token.ts'

const { createClient, deleteClient, getClientById, getClients, updateClient } =
  new ClientsController()

const router = Router()
  .use(verifyToken)
  .post('/create-client', createClient)
  .delete('/delete-client/:id', deleteClient)
  .get('/list', getClients)
  .get('/get-client/:id', getClientById)
  .put('/update-client/:id', updateClient)

export default router
