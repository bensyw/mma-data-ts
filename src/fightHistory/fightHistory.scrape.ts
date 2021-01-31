import { Browser } from "playwright";

export const getFightHistory = async (fighterId: string, browser: Browser) => {
    const page = await browser.newPage();
    await page.goto(process.env.FIGHT_HISTORY_URL + fighterId);
    const fightHistoryAll = await page.$$eval('.ResponsiveTable.fight-history table tbody tr', rowEls => {
        return Array.from(rowEls, rowEl => {
            const dataEls = rowEl.querySelectorAll('td');
            const dataArray = Array.from(dataEls, dataEl => dataEl.innerText);
            const anchorEl = rowEl.querySelector('a');
            const anchorURL = anchorEl.getAttribute('href');
            const fightHistory = {
                date: dataArray[0],
                opponent: dataArray[1],
                opponnetId: anchorURL.split('/').slice(-2)[0],
                result: dataArray[2],
                decision: dataArray[3],
                round: dataArray[4],
                time: dataArray[5],
                event: dataArray[6]
            };
            return fightHistory;
        })
    })
    console.log(fightHistoryAll)
    await page.close();
    return fightHistoryAll;
}
