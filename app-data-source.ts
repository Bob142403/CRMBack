import { DataSource, createConnection } from "typeorm";
import { User } from "./src/entity/user.entity";

export const myDataSource = createConnection({
  type: "mysql",
  database: "CRM",
  username: "root",
  password: "Iwanttoplaym0ba",
  entities: [User],
  logging: true,
  synchronize: true,
});
