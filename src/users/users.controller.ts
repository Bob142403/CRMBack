import { Request, Response } from 'express'
import { Users } from '../entity/user.entity.ts'
import { myDataSource } from '../services/db.ts'

class UsersController {
  async addUser(req: Request, res: Response) {
    const { first_name, last_name, email, password } = req.body
    if (first_name && last_name && email && password) {
      try {
        const user = await myDataSource.getRepository(Users).create(req.body)
        await myDataSource.getRepository(Users).save(user)
        res.status(200).json('User Created')
      } catch (err) {
        res.status(400)
      }
    } else res.status(400).json('Error')
    return req.body
  }
  async deleteUser(req: Request, res: Response) {
    const results = await myDataSource
      .getRepository(Users)
      .delete(req.params.id)

    if (results.affected) res.status(200).json('Success')
    else res.status(400).json('Incorrect Id!')

    return results.affected
  }
  async updateUser(req: Request, res: Response) {
    const user = await myDataSource.getRepository(Users).findOneBy({
      id: +req.params.id,
    })
    if (user) {
      myDataSource.getRepository(Users).merge(user, req.body)

      const results = await myDataSource.getRepository(Users).save(user)

      res.json(results)
    } else res.status(400).json('Incorrect Id!')
    return req.body
  }
  async getUserById(req: Request, res: Response) {
    const results = await myDataSource.getRepository(Users).findOneBy({
      id: +req.params.id,
    })

    res.status(200).json(results)

    return results
  }
  async getUsers(req: Request, res: Response) {
    const users = await myDataSource.getRepository(Users).find()

    res.status(200).json(users)
    return users
  }
  async getUsersByCompanyId(req: Request, res: Response) {
    const users = myDataSource.getRepository(Users).findBy({
      company_id: +req.params.companyId,
    })

    res.status(200).json(users)
  } 
}

export default UsersController
/**
 * 
 */