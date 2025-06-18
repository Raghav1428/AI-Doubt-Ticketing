import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import ticketRoutes from "./routes/ticket.routes.js"
import { serve } from "inngest/express"
import { inngest } from "./inngest/client.inngest.js"
import { onUserSignup } from "./inngest/functions/on-signup.functions.js";
import { onTicketCreated } from "./inngest/functions/on-ticket-create.functions.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use(
    "/api/inngest",
    serve({
        client: inngest,
        functions: [onUserSignup, onTicketCreated]
    })
);

mongoose
    .connect(process.env.MONGO_URI)
    .then( () => {
        console.log(`MongoDB connected`);
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    }

    )
    .catch((err) => console.error(`MongoDB error: ${err}`));