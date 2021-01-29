/* eslint-disable functional/prefer-type-literal */
import { Page } from 'playwright';

export interface Fighter {
    readonly firstName: string;
    readonly lastName: string;
    readonly fighterId: string;
}

export const getFighterObjs = async (page: Page) => {

    await page.goto('http://www.espn.com/mma/fighters?search=a');
    const fighterObjs = await page.$$eval('tr.oddrow>td>a, tr.evenrow>td>a', anchorEls => {
        return Array.from(anchorEls, anchorEl => {
            const anchorURL = anchorEl.getAttribute('href');
            const anchorInnerText = (<HTMLElement>anchorEl).innerText;
            const fighterNames = anchorInnerText.split(', ');
            const fighterObj: Fighter = {
                firstName: fighterNames[1],
                lastName: fighterNames[0],
                fighterId: anchorURL.split('/').slice(-2)[0]
            }
            return fighterObj
        })
    });
    return fighterObjs

}