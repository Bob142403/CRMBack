import mysql2 from "mysql2";

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "CRM",
});

export default connection;
/**
 * убрать папку nodemodules и создать giticnore
 * папку middle и route в src
 * перевсти всё в ts
 * servers внутри будет db.js 
 * servers будет в src 
 * будет папка users в которой будет users.controller.ts и users.route.ts тоже самое для clients 
 * в users.controller.js будет class 
 */