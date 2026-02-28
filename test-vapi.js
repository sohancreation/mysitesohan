const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
        page.on('response', response => {
            if (response.status() >= 400) {
                console.log('HTTP ERROR:', response.status(), response.url());
            }
        });

        await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle0' });
        console.log('Page loaded');

        await page.waitForTimeout(5000);

        const btn = await page.$('.vapi-btn, [class*="vapi"]');
        if (btn) {
            console.log('Vapi button found. Clicking...');
            await btn.evaluate(b => b.click());
            console.log('Clicked.');
        } else {
            console.log('No vapi button found in DOM.');
            const html = await page.content();
            if (html.includes('vapi')) {
                console.log('But vapi mention found in HTML');
            }
        }

        await page.waitForTimeout(5000);
        await browser.close();
    } catch (e) {
        console.error("Test failed", e);
        process.exit(1);
    }
})();
