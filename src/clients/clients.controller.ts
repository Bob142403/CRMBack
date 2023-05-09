import connection from "../../db.ts";

class Clients {
  async addClient(req, res) {
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
  async deleteClient(req, res) {
    const qwe = await connection
      .promise()
      .query(`DELETE FROM clients WHERE id='${req.params.id}'`); /// Обработка ошибок
    if (qwe[0].affectedRows) res.status(200).json("Success");
    else res.status(400).json("Incorrect Id!");
  }
  async updateClient(req, res) {
    const { first_name, last_name, email, phone_number, address } = req.body;
    const qwe = await connection
      .promise()
      .query(
        `UPDATE clients SET first_name='${first_name}', last_name='${last_name}', email='${email}', phone_number='${phone_number}', address='${address}' WHERE id='${req.params.id}'`
      );
    if (qwe[0].affectedRows) res.status(200).json("Success");
    else res.status(400).json("Incorrect Id!");
  }
  async getClientById(req, res) {
    const client = await connection
      .promise()
      .query(`SELECT * FROM clients WHERE id='${req.params.id}'`);
    if (client[0].length) res.status(200).json(client[0][0]); /// SELECT TOP
    else res.status(400).json("Incorrect Id!");
  }
  async getClients(req, res) {
    const clients = await connection.promise().query(`SELECT * FROM clients`);
    res.status(200).json(clients[0]);
  }
}

export default Clients;
