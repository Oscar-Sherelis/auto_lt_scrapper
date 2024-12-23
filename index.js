const scrapper = require("./scrapper");

(
  async () => {
    const url = "https://autogidas.lt/skelbimai/automobiliai/volkswagen/transporter/"; // Replace with your target URL
    const mainSelector = "main"; // Replace with your main section's CSS selector
    const selectors = "article"; // Replace with your article's CSS selector

    console.log(scrapper.scrapeWebsite)
    const articles = await scrapper.scrapeWebsite(url, mainSelector, selectors);
    console.log("Scraped cars:", articles);
  })();
