/* eslint-disable functional/prefer-type-literal */
import mongoose from "mongoose";

export interface IFightHistory extends mongoose.Document {
    readonly date: string;
    readonly opponent: string;
    readonly opponnetId: string;
    readonly result: string;
    readonly decision: string;
    readonly round: string;
    readonly time: string;
    readonly event: string;
}
export interface IFighter extends mongoose.Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly fighterId: string;
    readonly fightHistory: readonly IFightHistory[];
}

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

export default mongoose.model<IFighter>("Fighter", fighterSchema);