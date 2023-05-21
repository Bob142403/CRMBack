import { DataSource } from "typeorm";
import { CreateUsersMigration1566993933806 } from "../migrations/1566993933806-CreateUsersMigration";

export const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "root",
  password: "Iwanttoplaym0ba",
  database: "CRM",
  entities: ["src/entity/*.entity.ts"],
  logging: true,
  migrationsRun: true,
  migrations: [CreateUsersMigration1566993933806],
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
//eslint pretty ну и название migration
