import Fighter from "./fighter.model";

export const saveFighterObj = async (fighterObj) => {
    const fighter = new Fighter({
        firstName: fighterObj.firstName,
        lastName: fighterObj.lastName,
        fighterId: fighterObj.fighterId,
    });
    try {
        const newFighter = await fighter.save();
        console.log(newFighter)
    } catch (error) {
        console.log(error);
    }
}