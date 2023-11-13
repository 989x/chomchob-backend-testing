import express from "express";
import { getUserById, getUsers } from "../controllers/user";
import { verifyToken } from "../middlewares/accessToken";

const router = express.Router();

router.get("/user", verifyToken, getUsers);
router.get("/user/:userId", verifyToken, getUserById);

export default router;
