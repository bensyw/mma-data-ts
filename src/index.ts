import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../.env' });
import mongoose from "mongoose";
import { chromium } from 'playwright';

import { saveFighterObj } from "./fighter/fighter.dal";
import { getFighterObjs } from './fighter/fighter.scrape';

export const getFighterObjsWrapper = async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const fighterObjs = await getFighterObjs(page);
    console.log(fighterObjs);
    await page.close();
    await browser.close();
}

const saveFighterObjWrapper = async () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))
    const testFighterObj = { firstName: 'Isa', lastName: 'Abiev', fighterId: '3151935' };
    await saveFighterObj(testFighterObj);
}

saveFighterObjWrapper();