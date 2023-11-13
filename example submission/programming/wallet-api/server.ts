import express from "express";
import { Request, Response } from "express";
import sequelize from "./config/db-sequelize";

const app = express();
const port = 5000;

app.use(express.json());

async function startServer() {
  try {
    await sequelize.sync()
    console.log("Database synchronized");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
  } catch (err) {
    console.error("Error syncing the database:", err);
  }
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/test", (req: Request, res: Response) => {
  res.status(200).send("Ok");
});

startServer();
