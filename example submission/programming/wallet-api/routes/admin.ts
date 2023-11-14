import express from "express";
import { promoteToAdmin } from "../controllers/admin";
import { verifyToken } from "../middlewares/accessToken";
import { adminAccess } from "../middlewares/checkAccess";
import { limitParams } from "../middlewares/checkRequest";

const router = express.Router();

router.put("/promote-to-admin/:userId", verifyToken, adminAccess, limitParams(20, "userId"), promoteToAdmin);

export default router;
