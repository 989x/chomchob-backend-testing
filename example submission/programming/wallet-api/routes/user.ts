import express from "express";
import { getUserById, getUsers } from "../controllers/user";
import { verifyToken } from "../middlewares/accessToken";
import { userAccess } from "../middlewares/checkAccess";
import { limitParams } from "../middlewares/checkRequest";

const router = express.Router();

router.get("/user", verifyToken, userAccess, getUsers);
router.get("/user/:userId", verifyToken, userAccess, limitParams(20, "userId"), getUserById);

export default router;
