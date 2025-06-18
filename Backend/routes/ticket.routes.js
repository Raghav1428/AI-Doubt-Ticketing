import express from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { createTicket, getTicket, getTickets } from "../controllers/ticket.controllers.js";

const router = express.Router();

router.get("/", authenticate, getTickets);
router.get("/:id", authenticate, getTicket);
router.post("/", authenticate, createTicket);

export default router;