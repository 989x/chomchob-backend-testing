import express from "express";
import { Request, Response } from "express";
import sequelize from "./configs/db-sequelize";
import authRoutes from "./routes/auth";

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

app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");

});

startServer();
