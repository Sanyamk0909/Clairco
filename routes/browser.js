const puppeteer = require("puppeteer");

let browserPromise = puppeteer.launch({
    headless: true, 
    args: ['--no-sandbox'],
    devtools: true,
    ignoreHTTPSErrors: true,
    defaultViewport: {
        width: 375,
        height: 667,
        isMobile: true,
    },
    timeout: 0,
});