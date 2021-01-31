import Fighter from "./fighter.model";

export const saveFighterObj = async (fighterObj) => {
    const fighter = new Fighter({
        firstName: fighterObj.firstName,
        lastName: fighterObj.lastName,
        fighterId: fighterObj.fighterId,
        fightHistory: fighterObj.fightHistory
    });
    try {
        await fighter.save();
    } catch (error) {
        console.log(error);
    }
}