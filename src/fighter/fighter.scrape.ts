/* eslint-disable functional/prefer-type-literal */
import { Page } from 'playwright';

export interface Fighter {
    readonly firstName: string;
    readonly lastName: string;
    readonly fighterId: string;
}

export const getFighterNameObjs = async (page: Page, letter: string) => {

    await page.goto(process.env.FIGHTER_URL + letter);
    const fighterNameObjs = await page.$$eval('tr.oddrow>td>a, tr.evenrow>td>a', anchorEls => {
        return Array.from(anchorEls, anchorEl => {
            const anchorURL = anchorEl.getAttribute('href');
            const anchorInnerText = (<HTMLElement>anchorEl).innerText;
            const fighterNames = anchorInnerText.split(', ');
            const fighterNameObj: Fighter = {
                firstName: fighterNames[1],
                lastName: fighterNames[0],
                fighterId: anchorURL.split('/').slice(-2)[0]
            }
            return fighterNameObj
        })
    });
    return fighterNameObjs;
}

export const getFightHistoryObjs = async (page: Page, fighterId: string) => {
    await page.goto(process.env.FIGHT_HISTORY_URL + fighterId);
    const fightHistoryObjs = await page.$$eval('.ResponsiveTable.fight-history table tbody tr', rowEls => {
        return Array.from(rowEls, rowEl => {
            const dataEls = rowEl.querySelectorAll('td');
            const dataArray = Array.from(dataEls, dataEl => dataEl.innerText);
            const anchorEl = rowEl.querySelector('a');
            const anchorURL = anchorEl.getAttribute('href');
            const fightHistoryObj = {
                date: dataArray[0],
                opponent: dataArray[1],
                opponnetId: anchorURL.split('/').slice(-2)[0],
                result: dataArray[2],
                decision: dataArray[3],
                round: dataArray[4],
                time: dataArray[5],
                event: dataArray[6]
            };
            return fightHistoryObj;
        })
    })
    return fightHistoryObjs;
}