import cors from "cors";
import users from "./src/users/users.route.ts";
import clients from "./src/clients/clients.route.ts";
import { myDataSource } from "./app-data-source.ts";
import { User } from "./entity/user.entity.ts";
import express, { Request, Response } from "express";

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/users", users);
app.use("/clients", clients);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}....`);
});
