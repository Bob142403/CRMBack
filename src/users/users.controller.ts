import { Request, Response } from 'express'
import { Users } from '../entity/user.entity.ts'
import { myDataSource } from '../services/db.ts'
import generatePassword from 'password-generator'
// import { createTransport, getTestMessageUrl } from 'nodemailer'

class UsersController {
  async addUser(req: Request, res: Response) {
    const { email } = req.body

    const password = generatePassword()

    // create reusable transporter object using the default SMTP transport
    // let transporter = createTransport({
    //   host: 'gmail',
    //   auth: {
    //     user: 'sbobohoni6@gmail.com', // generated ethereal user
    //     pass: 'tmbvgiqysbhoqyjd', // generated ethereal password
    //   },
    // })

    // // send mail with defined transport object
    // let info = await transporter
    //   .sendMail({
    //     from: 'sbobohoni6@gmail.com', // sender address
    //     to: 'sbobohoni4@gmail.com', // list of receivers
    //     subject: 'Hello ✔', // Subject line
    //     text: 'Hello world?', // plain text body
    //     html: '<b>Hello world?</b>', // html body
    //   })
    //   .catch((err) => {
    //     console.log('EROORRR;', err)
    //   })

    // console.log('Message sent: %s', info)
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account

    try {
      const userCheck = await myDataSource
        .getRepository(Users)
        .findOneBy({ email })

      if (userCheck) {
        res.status(201).json('This email is already Excist')
        return req.body
      }
      const user = await myDataSource
        .getRepository(Users)
        .create({ ...req.body, password })
      await myDataSource.getRepository(Users).save(user)
      res.status(200).json('User Created')
    } catch (err) {
      res.status(400)
    }
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
    const users = await myDataSource
      .getRepository(Users)
      .findBy(req.body['auth'])

    res.status(200).json(users)
    return users
  }
}

export default UsersController
