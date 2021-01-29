import mongoose from "mongoose";

const fighterSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    fighterId: {
        type: String
    }
})

export default mongoose.model('Fighter', fighterSchema);