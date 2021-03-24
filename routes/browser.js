const puppeteer = require("puppeteer");

let browserPromise = puppeteer.launch({
    headless: false, 
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

module.exports = browserPromise;