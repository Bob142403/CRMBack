import { Request, Response } from 'express'
import { myDataSource } from '../services/db.ts'
import { Company } from '../entity/company.entity.ts'

class CompanyController {
  async addCompany(req: Request, res: Response) {
    const { name } = req.body
    if (name) {
      try {
        const company = await myDataSource
          .getRepository(Company)
          .create(req.body)
        await myDataSource.getRepository(Company).save(company)
        res.status(200).json('Company created!')
      } catch (err) {
        res.status(400)
      }
    } else res.status(400)
    return req.body
  }
  async getCompanes(req: Request, res: Response) {
    const company = await myDataSource.getRepository(Company).find()

    res.status(200).json(company)
    return company
  }
  async getCompanyById(req: Request, res: Response) {
    const company = await myDataSource.getRepository(Company).findOneBy({
      id: +req.params.id,
    })

    if (company) res.status(200).json(company)
    else res.status(400).json('Incorrect Id!')

    return company
  }
  async deleteCompany(req: Request, res: Response) {
    const results = await myDataSource
      .getRepository(Company)
      .delete(req.params.id)

    if (results.affected) res.status(200).json('Success')
    else res.status(400).json('Incorrect Id!')
    return results.affected
  }
  async updateCompany(req: Request, res: Response) {
    const company = await myDataSource.getRepository(Company).findOneBy({
      id: +req.params.id,
    })
    if (company) {
      myDataSource.getRepository(Company).merge(company, req.body)

      const results = await myDataSource.getRepository(Company).save(company)

      res.json(results)
    } else res.status(400).json('Incorrect Id!')
    return req.body
  }
}

export default CompanyController
