import { Router } from 'express'
import ClientsController from './clients.controller.ts'
import { verifyToken } from '../middlewares/verify-token.ts'

const {
  addClient,
  deleteClient,
  getClientById,
  getClients,
  updateClient,
  getClientsByCompanyId,
} = new ClientsController()

const router = Router()
  .use(verifyToken)
  .post('/create-client', addClient)
  .delete('/delete-client/:id', deleteClient)
  .get('/list', getClients)
  .get('/get-client/:id', getClientById)
  .put('/update-client/:id', updateClient)
  .get('/get-clients-companyId/:companyId', getClientsByCompanyId)

export default router
