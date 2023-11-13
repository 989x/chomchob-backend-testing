import express from "express";
import { promoteToAdmin } from "../controllers/admin";
import { verifyToken } from "../middlewares/accessToken";

const router = express.Router();

router.put("/promote-to-admin/:userId", verifyToken, promoteToAdmin);

export default router;
