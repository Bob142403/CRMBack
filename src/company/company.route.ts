import { Router } from 'express'
import CompanyController from './company.controller.ts'
import { verifyToken } from '../middlewares/verify-token.ts'

const {
  addCompany,
  getCompanes,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = new CompanyController()

const router = Router()
  .use(verifyToken)
  .post('/create-company', addCompany)
  .get('/list', getCompanes)
  .get('/get-company/:id', getCompanyById)
  .delete('/delete-company/:id', deleteCompany)
  .put('/update-company/:id', updateCompany)

export default router
