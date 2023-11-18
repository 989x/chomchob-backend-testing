import express from "express";
import { Request, Response } from "express";
import sequelize from "./configs/sequelize";
import { allSeedFunctions } from "./configs/seed";

const app = express();
const port = 5000;

app.use(express.json());

async function startServer() {
  try {
    await sequelize.sync()
    console.log("Database synchronized");

    // mocking seed data
    for (const seedFunction of allSeedFunctions) {
      await seedFunction();
    }

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
  } catch (err) {
    console.error("Error syncing the database:", err);
  }
}

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

startServer();
