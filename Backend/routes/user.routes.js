import express from "express";
import { getUsers, login, logout, signup, updateUser } from "../controllers/user.controllers.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-user", authenticate, updateUser);
router.get("/users", authenticate, getUsers);

export default router;