import { Request, Response } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { PRIVATE_KEY } from '../users/users.route.ts'
import { myDataSource } from '../services/db.ts'
import { Users } from '../entity/user.entity.ts'
import User from '../types/User.ts'

class Auth {
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body
    if (email && password) {
      const user = await myDataSource.getRepository(Users).findOneBy({
        email,
        password,
      })
      const token = jsonwebtoken.sign(req.body, PRIVATE_KEY)
      if (!user) {
        res.status(404).json('Incorrect Email or Passsword')
      } else res.status(200).json({ token, user })
    } else res.status(404).json('Incorrect User!')
    return req.body
  }
  async signUp(req: Request, res: Response) {
    const { first_name, last_name, email, password } = req.body
    if (first_name && last_name && email && password) {
      try {
        const userCheck = await myDataSource
          .getRepository(Users)
          .findOneBy({ email })

        if (userCheck) {
          res.status(201).json('This email is already Excist')
          return req.body
        }

        const user = await myDataSource.getRepository(Users).create(req.body)
        await myDataSource.getRepository(Users).save(user)
        res.status(200).json('User Created')
      } catch (err) {
        res.status(400)
      }
    } else res.status(400).json('Incorrect User!')

    return req.body
  }
  async auth(req: Request, res: Response) {
    try {
      const token = req.headers.authorization
      const user = jsonwebtoken.verify(token || '', PRIVATE_KEY) as User
      const userInfo = await myDataSource
        .getRepository(Users)
        .findOneBy({ email: user.email })

      if (userInfo) res.status(200).json(userInfo)
      else res.status(400).json('Error')
    } catch (err) {
      res.status(400).json('Token is not verified')
    }
  }
  async chooseCompany(req: Request, res: Response) {
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
}

export default Auth
