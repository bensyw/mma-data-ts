import mongoose from "mongoose";

export const fightHistorySchema = new mongoose.Schema({
    date: { type: String },
    opponent: { type: String },
    opponnetId: { type: String },
    result: { type: String },
    decision: { type: String },
    round: { type: String },
    time: { type: String },
    event: { type: String },
});