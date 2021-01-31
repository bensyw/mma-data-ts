import { Page } from "playwright";

import { IFighterName, IFightHistory } from "../types/Fighter";

export const getFighterNameObjs = async (page: Page, letter: string): Promise<readonly IFighterName[]> => {
    await page.goto(process.env.FIGHTER_URL + letter);
    const fighterNameObjs = await page.$$eval("tr.oddrow>td>a, tr.evenrow>td>a", anchorEls => {
        return Array.from(anchorEls, anchorEl => {
            const anchorURL = anchorEl.getAttribute("href");
            const anchorInnerText = (<HTMLElement>anchorEl).innerText;
            const fighterNames = anchorInnerText.split(", ");
            const fighterNameObj: IFighterName = {
                firstName: fighterNames[1],
                lastName: fighterNames[0],
                fighterId: anchorURL.split("/").slice(-2)[0]
            }
            return fighterNameObj
        })
    });
    return fighterNameObjs;
}

export const getFightHistoryObjs = async (page: Page, fighterId: string): Promise<readonly IFightHistory[]> => {
    await page.goto(process.env.FIGHT_HISTORY_URL + fighterId);
    const allFightHistoryObjs = await page.$$eval(".ResponsiveTable.fight-history table tbody tr", rowEls => {
        return Array.from(rowEls, rowEl => {
            const dataEls = rowEl.querySelectorAll("td");
            const dataArray = Array.from(dataEls, dataEl => dataEl.innerText);
            // Exception handling: Doesn"t have any opponent information
            // Only select anchor in the second data cell, in-case the event has link but not the opponent
            const anchorEl = rowEl.querySelector("td:nth-child(2) > a");
            if (anchorEl == null) {
                return null;
            } else {
                const anchorURL = anchorEl.getAttribute("href");
                const OpponentId = anchorURL.split("/").slice(-2)[0];
                const fightHistoryObj: IFightHistory = {
                    date: dataArray[0],
                    opponent: dataArray[1],
                    opponnetId: OpponentId,
                    result: dataArray[2],
                    decision: dataArray[3],
                    round: dataArray[4],
                    time: dataArray[5],
                    event: dataArray[6]
                };
                return fightHistoryObj;
            }
        })
    })
    // Remove all null objects
    const fightHistoryObjs = allFightHistoryObjs.filter(fightHistoryObj => {
        return fightHistoryObj != null;
    })
    return fightHistoryObjs;
}