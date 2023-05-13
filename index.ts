import cors from "cors";
import users from "./src/users/users.route.ts";
import clients from "./src/clients/clients.route.ts";
import auths from "./src/auth/auth.route.ts";
import express from "express";

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/users", users);
app.use("/clients", clients);
app.use(auths);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}....`);
});
