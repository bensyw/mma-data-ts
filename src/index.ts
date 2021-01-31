import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../.env' });
import mongoose from "mongoose";
import { chromium } from 'playwright';

import { saveFighterObj } from "./fighter/fighter.dal";
import { getFighterNameObjs, getFightHistoryObjs } from './fighter/fighter.scrape';

const SCRAPING_TIMTOUT = 3000;

export const saveFighterObjWrapper = async () => {
    // Connect to database
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))
    // Start browser and page
    const browser = await chromium.launch();
    const pageAllFighter = await browser.newPage();
    const pageSingleFighter = await browser.newPage();
    // Get and save fighterobjs from 'a' to 'z'
    const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
    // Iterate through each letter
    // eslint-disable-next-line functional/no-loop-statement
    for (const letter of alphabet) {
        console.log(`Saving letter ${letter}`);
        const fighterNameObjs = await getFighterNameObjs(pageAllFighter, letter);
        console.log(`Total number of fighter in letter ${letter}: ${fighterNameObjs.length}`);
        // Iterate through each fighter URL
        // eslint-disable-next-line functional/no-loop-statement
        for (const [index, fighterNameObj] of fighterNameObjs.entries()) {
            console.log(`Saving fighter ${index + 1} / ${fighterNameObjs.length}`);
            const fightHistoryObjs = await getFightHistoryObjs(pageSingleFighter, fighterNameObj.fighterId);
            const fighterObj = { ...fighterNameObj, fightHistory: fightHistoryObjs };
            // Save fighterObj
            await saveFighterObj(fighterObj);
            await new Promise(resolve => setTimeout(resolve, SCRAPING_TIMTOUT)); // Wait
        }
        console.log(`Letter ${letter} is saved.`);
        await new Promise(resolve => setTimeout(resolve, SCRAPING_TIMTOUT)); // Wait
    }
    // Close browser
    await browser.close();
    // Disconnect from database
    db.close();
    console.log('Disconnected from Database');
}

saveFighterObjWrapper();