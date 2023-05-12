import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3000,
  username: "root",
  password: "Iwanttoplaym0ba",
  database: "CRM",
  entities: ["src/entity/*.js"],
  logging: true,
  synchronize: true,
});
