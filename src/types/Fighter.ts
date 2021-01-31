/* eslint-disable functional/prefer-type-literal */
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