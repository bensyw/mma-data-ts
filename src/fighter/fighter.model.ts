import mongoose from "mongoose";

import { fightHistorySchema } from '../fightHistory/fightHistory.model';

const fighterSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    fighterId: {
        type: String
    },
    fightHistory: [fightHistorySchema]
})

export default mongoose.model('Fighter', fighterSchema);