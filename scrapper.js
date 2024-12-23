// Import puppeteer
const puppeteer = require("puppeteer");

/**
 * Universal web scraper function
 * @param {string} url - The URL of the website to scrape.
 * @param {string} mainSelector - The CSS selector for the main container (e.g., 'main').
 * @param {Object} selectors - An object where keys are labels and values are CSS selectors.
 * @returns {Object} - A key-value pair of scraped data.
 */
async function scrapeWebsite(url, mainSelector, selectors) {
  const browser = await puppeteer.launch({ headless: false, devtools: true, dumpio: true });
  const page = await browser.newPage();

  try {
    // Navigate to the URL
    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    if (url.includes("autogidas")) {
      // Ensure images have loaded by waiting for their lazy-loaded versions
      await page.waitForSelector(`.filter-content`, { visible: true });
      // Scrape data within the main section
      const data = await page.$$eval(`${mainSelector} ${selectors}`, (articleElements) =>
        articleElements.map((article) => {
          // Customize this based on the structure of your data
          // commented image, because not works currently.
          return {
            title: article.querySelector(".item-title")?.innerText.trim() || null,
            // image: article.querySelector(".image > img")?.src || null,
            year: article.querySelector(".param-year b")?.innerText || null,
            fuel_type: article.querySelector(".param-fuel-type b")?.innerText || null,
            mileage: article.querySelector(".param-mileage b")?.innerText || null,
            gearbox: article.querySelector(".param-gearbox b")?.innerText || null,
            engine: article.querySelector(".param-engine b")?.innerText || null,
            location: article.querySelector(".param-location b")?.innerText || null,
            price: article.querySelector(".item-price")?.innerText || null,
            link: article.querySelector(".item-link ")?.href || null,
          };
        }),
      );
      if (Array.isArray(data) && data.length > 0) {
        const uniqueArray = data.filter(
          (o, index, arr) =>
            arr.findIndex((item) => JSON.stringify(item) === JSON.stringify(o)) === index,
        );
        return uniqueArray;
      }
      return false;
    }
  } catch (error) {
    console.error("Error scraping website:", error);
    return null;
  } finally {
    await browser.close();
  }
}

module.exports = { scrapeWebsite };
