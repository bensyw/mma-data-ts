import { Page } from 'playwright';

export const getPublicIP = async (page: Page) => {
    await page.goto(process.env.CHECKIP_URL);
    const myIP = await page.$$eval('span.address#ipv4 > a', Els => {
        return (<HTMLElement>Els[0]).innerText;
    })
    return myIP;
}