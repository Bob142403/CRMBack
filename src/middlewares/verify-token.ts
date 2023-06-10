import { PRIVATE_KEY } from '../users/users.route.ts'
import jsonwebtoken from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { myDataSource } from '../services/db.ts'
import { Users } from '../entity/user.entity.ts'
import User from '../types/User.ts'

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization

    const user = jsonwebtoken.verify(token || '', PRIVATE_KEY) as User

    const userInfo = await myDataSource
      .getRepository(Users)
      .findOneBy({ email: user.email })

    req.body = { ...req.body, auth: { company_id: userInfo?.company_id } }

    next()
  } catch (err) {
    res.status(400).json('Token is not verified')
  }
}
/**
 * роль
 * super user: список company
 * admin: список user
 * обычный : не иммет
 */
