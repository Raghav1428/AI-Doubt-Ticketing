import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "TODO",
            enum: ["TODO", "IN_PROGRESS", "DONE"],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        priority: {
            type: String,
        },
        deadline: {
            type: Date,
        },
        helpfulNotes: {
            type: String,
        },
        relatedSkills: {
            type: [String],
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

export default mongoose.model("Ticket", ticketSchema)
