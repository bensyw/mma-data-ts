# MMA-data

Collect MMA fighter and their fight history data with a headless browser.

**Tech stack:**
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](mongodb.com)
- [Playwright](https://playwright.dev/)

## Installation

`yarn add https://github.com/bensyw/mma-data-ts.git`

## Configuration

First, we create an environment file at the project root `/.env` with the following variables

- `DATABASE_URL` MongoDB URL
- `FIGHTER_URL` A page containing all fighters whose last name starts with the same letter.
- `FIGHT_HISTORY_URL` A page containing all fight history of a certain fighter.
- `USE_SOCKS5` Set to true if you'd like to use a SOCKS5 proxy
- `SOCKS5_URL` SOCKS5 Proxy URL. Example: `socks:\\myproxy:1080`
- `SOCKS5_USERNAME` SOCKS5 proxy username.
- `SOCKS5_PASSWORD` SOCKS5 proxy password.
- `SHOULD_CHECKIP` Set to true if you'd like to double check your current public IP address.
- `CHECKIP_URL` A web page for checking your current public IP address.

The default selectors in `page.$eval(selector, pageFunction[, arg])` are written based on ESPN MMA. See [the list of fighter](http://www.espn.com/mma/fighters?search=) and [the fight history](https://www.espn.com/mma/fighter/history/_/id/) pages.

## Get Started 

Start the script by running `ts-node .\src\index.ts`

```console
ts-node .\src\index.ts
Starting browser
Connected to Database
Public IP: xxx.xxx.xxx.xxx
Saving letter 1/26 [=-------------------------]
Saving fighter 1037/1343 [=======================================-----------]
```

## Document Schema
```JavaScript
// TODO: Add strongly typed schema
const fightHistorySchema = new mongoose.Schema({
    date: { type: String },
    opponent: { type: String },
    opponnetId: { type: String },
    result: { type: String },
    decision: { type: String },
    round: { type: String },
    time: { type: String },
    event: { type: String },
});

const fighterSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    fighterId: { type: String },
    fightHistory: [fightHistorySchema]
})
```