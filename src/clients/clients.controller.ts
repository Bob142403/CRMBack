import connection from "../services/db.ts";
import { Request, Response } from "express";

interface qwe {
  affectedRows: number;
}

class Clients {
  async addClient(req: Request, res: Response) {
    const { first_name, last_name, email, phone_number, address } = req.body;
    if (first_name && last_name && email && phone_number && address) {
      try {
        await connection
          .promise()
          .query(
            `INSERT INTO clients (first_name, last_name, email, phone_number, address) VALUE('${first_name}', '${last_name}', '${email}', '${phone_number}', '${address}')`
          );
        res.status(200).json("Client created!");
      } catch (err) {
        res.status(400);
      }
    } else res.status(400);
  }
  async deleteClient(req: Request, res: Response) {
    const qwe = await connection
      .promise()
      .query(`DELETE FROM clients WHERE id='${req.params.id}'`); /// Обработка ошибок
    const wer = qwe[0] as qwe;
    if (wer.affectedRows) res.status(200).json("Success");
    else res.status(400).json("Incorrect Id!");
  }
  async updateClient(req: Request, res: Response) {
    const { first_name, last_name, email, phone_number, address } = req.body;
    const qwe = await connection
      .promise()
      .query(
        `UPDATE clients SET first_name='${first_name}', last_name='${last_name}', email='${email}', phone_number='${phone_number}', address='${address}' WHERE id='${req.params.id}'`
      );
    const wer = qwe[0] as qwe;
    if (wer.affectedRows) res.status(200).json("Success");
    else res.status(400).json("Incorrect Id!");
  }
  async getClientById(req: Request, res: Response) {
    const clients = await connection
      .promise()
      .query(`SELECT * FROM clients WHERE id='${req.params.id}'`);
    const client = clients[0] as Object[];
    if (client.length) res.status(200).json(client[0]); /// SELECT TOP
    else res.status(400).json("Incorrect Id!");
  }
  async getClients(req: Request, res: Response) {
    const clients = await connection.promise().query(`SELECT * FROM clients`);
    res.status(200).json(clients[0]);
  }
}

export default Clients;
