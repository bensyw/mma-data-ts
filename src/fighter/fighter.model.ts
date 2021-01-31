/* eslint-disable functional/prefer-type-literal */
import mongoose from "mongoose";

export interface IFighterName {
    readonly firstName: string;
    readonly lastName: string;
    readonly fighterId: string;
}

export interface IFightHistory {
    readonly date: string;
    readonly opponent: string;
    readonly opponnetId: string;
    readonly result: string;
    readonly decision: string;
    readonly round: string;
    readonly time: string;
    readonly event: string;
}

export interface IFighter extends IFighterName {
    readonly fightHistory: readonly IFightHistory[];
}

interface IFighterDocument extends IFighter, mongoose.Document { }

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

export default mongoose.model<IFighterDocument>("IFighter", fighterSchema);