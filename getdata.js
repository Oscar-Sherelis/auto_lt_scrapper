const scrapper = require("./scrapper");

async function getData(url, car_brand, car_model, data_collected) {
  const mainSelector = "main"; // Replace with your main section's CSS selector
  const selectors = "article"; // Replace with your article's CSS selector

  let current_page = 1;

  // important autogidas https://autogidas.lt/skelbimai/automobiliai/volkswagen/transporter/?page=2
  // autoplius https://autoplius.lt/skelbimai/naudoti-automobiliai/volkswagen/transporter?page_nr=2
  let currentUrl = url + car_brand + "/" + car_model + "/?page=" + current_page; // Replace with your target currentUrl

  while (true) {
    console.log(currentUrl);
    const cars = await scrapper.scrapeWebsite(currentUrl, mainSelector, selectors);
    console.log(cars);
    if (cars) {
      const hasCommonObjects = cars.some((obj1) =>
        data_collected.some((obj2) => JSON.stringify(obj1) === JSON.stringify(obj2)),
      );

      // when repeats starts, return collected data
      if (hasCommonObjects) {
        console.log("last working page", current_page);
        console.log("exists", cars);
        return data_collected;
      }

      data_collected.push(...cars);
      console.log("Current page ", current_page);
      console.log("Data collected count ", data_collected.length);
      // Create a new array and add the new object
      current_page++;

      currentUrl = url + car_brand + "/" + car_model + "/?page=" + current_page;
    } else {
      console.log("Collected data ", data_collected);
      break;
    }
  }
}

module.exports = { getData };
