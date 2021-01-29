import { chromium } from 'playwright';

import { getFighterObjs } from './fighter'

const getFighterObjsWrapper = async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await getFighterObjs(page);
    await page.close();
    await browser.close();
}

getFighterObjsWrapper();