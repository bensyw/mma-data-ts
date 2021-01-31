import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../.env' });
import mongoose from "mongoose";
import Multiprogress from 'multi-progress';
import { chromium } from 'playwright';

import { saveFighterObj } from "./fighter/fighter.dal";
import { getFighterNameObjs, getFightHistoryObjs } from './fighter/fighter.scrape';
import { getPublicIP } from "./utility/network";

const SCRAPING_TIMTOUT = 2000;

export const scrapeAllFighter = async () => {
    // Connect to database
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))
    // Start browser and page
    console.log('Starting browser');
    const browser = process.env.USE_SOCKS5 == "true" ?
        await chromium.launch()
        : await chromium.launch({
            proxy: {
                server: process.env.SOCKS5_URL,
                username: process.env.SOCKS5_USERNAME,
                password: process.env.SOCKS5_PASSWORD
            }
        });
    const pageAllFighter = await browser.newPage();
    const pageSingleFighter = await browser.newPage();
    // Check the public IP of the current connection
    if (process.env.SHOULD_CHECKIP == "true") {
        const pageCheckIP = await browser.newPage();
        const myIP = await getPublicIP(pageCheckIP);
        console.log(`Public IP: ${myIP}`);
        await pageCheckIP.close();
    }
    // Get and save fighterobjs from 'a' to 'z'
    const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
    // Spawn multiple progress bars
    const multi = new Multiprogress(process.stderr);
    const letterBar = multi.newBar('Saving letter :current/:total [:bar]', { total: alphabet.length, width: 26 });
    // Iterate through each letter
    // eslint-disable-next-line functional/no-loop-statement
    for (const letter of alphabet) {
        letterBar.tick();
        const fighterNameObjs = await getFighterNameObjs(pageAllFighter, letter);
        const fighterBar = multi.newBar('Saving fighter :current/:total [:bar]', { total: fighterNameObjs.length, width: 50, clear: true });
        // Iterate through each fighter URL
        // eslint-disable-next-line functional/no-loop-statement
        for (const fighterNameObj of fighterNameObjs) {
            fighterBar.tick();
            const fightHistoryObjs = await getFightHistoryObjs(pageSingleFighter, fighterNameObj.fighterId);
            const fighterObj = { ...fighterNameObj, fightHistory: fightHistoryObjs };
            // Save fighterObj
            await saveFighterObj(fighterObj);
            await new Promise(resolve => setTimeout(resolve, SCRAPING_TIMTOUT)); // Wait
        }
        await new Promise(resolve => setTimeout(resolve, SCRAPING_TIMTOUT)); // Wait
    }
    console.log('Closing browser')
    // Close browser
    await browser.close();
    // Disconnect from database
    db.close();
    console.log('Disconnected from Database');
}

scrapeAllFighter();