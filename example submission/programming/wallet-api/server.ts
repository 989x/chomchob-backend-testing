import express from "express";
import { Request, Response } from "express";
import sequelize from "./configs/db-sequelize";
import { allSeedFunctions } from "./utils/seed";
import adminRoutes from "./routes/admin";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import walletRoutes from "./routes/wallet";
import manageRoutes from "./routes/manage";

const app = express();
const port = 5000;

app.use(express.json());

async function startServer() {
  try {
    await sequelize.sync()
    console.log("Database synchronized");

    // mocking seed data and call all functions
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

app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", walletRoutes);
app.use("/api", manageRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

startServer();
