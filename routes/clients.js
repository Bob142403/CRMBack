import { Router } from "express";
import bodyParser from "body-parser";
import connection from "../db.js";

const router = Router();

router.post("/", (req, res) => {
  const { first_name, last_name, email, phone_number, address } = req.body;
  if (first_name && last_name && email) {
    try {
      connection
        .promise()
        .query(
          `INSERT INTO clients (first_name, last_name, email, phone_number, address) VALUE('${first_name}', '${last_name}', '${email}', '${phone_number}', '${address}')`
        );
      res.status(200).send({ msg: "Create Client" });
    } catch (err) {
      console.log(err);
    }
  }
  res.status(200);
});
router.get("/", async (req, res) => {
  const clients = await connection.promise().query(`SELECT * FROM clients`);
  res.send(clients[0]);
});

router.get("/:id", async (req, res) => {
  const client = await connection
    .promise()
    .query(`SELECT * FROM clients WHERE id='${req.params.id}'`);
  res.send(client[0][0]);
});
router.delete("/:id", async (req, res) => {
  await connection
    .promise()
    .query(`DELETE FROM clients WHERE id='${req.params.id}'`);
  res.send({ msg: "DELETE Success" });
});

router.put("/:id", async (req, res) => {
  const { first_name, last_name, email, phone_number, address } = req.body;
  await connection
    .promise()
    .query(
      `UPDATE clients SET first_name='${first_name}', last_name='${last_name}', email='${email}', phone_number='${phone_number}', address='${address}' WHERE id='${req.params.id}'`
    );
  res.send({ msg: "Update success" });
});

export default router;
