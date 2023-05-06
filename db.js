import mysql2 from "mysql2";

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Iwanttoplaym0ba",
  database: "CRM",
});

export default connection;
