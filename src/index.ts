import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../.env' });
import mongoose from "mongoose";
import { chromium } from 'playwright';

import { saveFighterObj } from "./fighter/fighter.dal";
import { getFighterObjs } from './fighter/fighter.scrape';

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
    const page = await browser.newPage();
    // Get and save fighterobjs from 'a' to 'z'
    const alphabet = 'abc'.split('');
    // eslint-disable-next-line functional/no-loop-statement
    for (const letter of alphabet) {
        console.log(`Saving letter ${letter}`);
        const fighterObjs = await getFighterObjs(page, letter);
        await Promise.all(fighterObjs.map(fighterObj => saveFighterObj(fighterObj)))
    }
    // Close browser and page
    await page.close();
    await browser.close();
    // Disconnect from database
    db.close();
    console.log('Disconnected from Database');
}

saveFighterObjWrapper();