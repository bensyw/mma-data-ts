import { Browser, chromium, Page } from 'playwright';

export const startBrowserPage = async (): Promise<Page> => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    return page;
}

export const closeBrowserPage = async (page: Page, browser: Browser): Promise<void> => {
    await page.close();
    await browser.close();
}