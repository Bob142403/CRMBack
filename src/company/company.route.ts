import { Router } from 'express'
import CompanyController from './company.controller.ts'
import { verifyToken } from '../middlewares/verify-token.ts'

const {
  createCompany,
  getCompanes,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = new CompanyController()

const router = Router()
  .post('/create-company', createCompany)
  .get('/list', getCompanes)
  .get('/get-company/:id', getCompanyById)
  .delete('/delete-company/:id', deleteCompany)
  .put('/update-company/:id', updateCompany)

export default router
