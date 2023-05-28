import { Request, Response } from 'express'
import { myDataSource } from '../services/db.ts'
import { Clients } from '../entity/client.entity.ts'

class ClientsController {
  async addClient(req: Request, res: Response) {
    const { first_name, last_name, email, phone_number, address } = req.body
    if (first_name && last_name && email && phone_number && address) {
      try {
        const client = await myDataSource
          .getRepository(Clients)
          .create(req.body)
        await myDataSource.getRepository(Clients).save(client)
        res.status(200).json('Client created!')
      } catch (err) {
        res.status(400)
      }
    } else res.status(400)
    return req.body
  }
  async deleteClient(req: Request, res: Response) {
    const results = await myDataSource
      .getRepository(Clients)
      .delete(req.params.id)

    if (results.affected) res.status(200).json('Success')
    else res.status(400).json('Incorrect Id!')
    return results.affected
  }
  async updateClient(req: Request, res: Response) {
    const client = await myDataSource.getRepository(Clients).findOneBy({
      id: +req.params.id,
    })
    if (client) {
      myDataSource.getRepository(Clients).merge(client, req.body)

      const results = await myDataSource.getRepository(Clients).save(client)

      res.json(results)
    } else res.status(400).json('Incorrect Id!')
    return req.body
  }
  async getClientById(req: Request, res: Response) {
    const client = await myDataSource.getRepository(Clients).findOneBy({
      id: +req.params.id,
    })

    res.status(200).json(client)

    return client
  }
  async getClients(req: Request, res: Response) {
    const clients = await myDataSource.getRepository(Clients).find()

    res.status(200).json(clients)
    return clients
  }
  async getClientsByCompanyId(req: Request, res: Response) {
    const clients = await myDataSource.getRepository(Clients).findBy({
      company_id: +req.params.companyId,
    })
    res.status(200).json(clients)

    return clients
  }
}

export default ClientsController
