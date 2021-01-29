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
    await page.close();
    await browser.close();
    return fighterObjs;
}

export const saveFighterObjWrapper = async () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))
    const fighterObjs = await getFighterObjsWrapper();

    await Promise.all(fighterObjs.map(fighterObj => saveFighterObj(fighterObj)))
    db.close();
}

saveFighterObjWrapper();