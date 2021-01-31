import mongoose from "mongoose";

const fightHistorySchema = new mongoose.Schema({
    date: { type: String },
    opponent: { type: String },
    opponnetId: { type: String },
    result: { type: String },
    decision: { type: String },
    round: { type: String },
    time: { type: String },
    event: { type: String },
});

const fighterSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    fighterId: { type: String },
    fightHistory: [fightHistorySchema]
})

export default mongoose.model('Fighter', fighterSchema);