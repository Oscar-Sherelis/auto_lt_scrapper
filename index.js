const scrapper = require("./scrapper");

(async () => {
  const mainSelector = "main"; // Replace with your main section's CSS selector
  const selectors = "article"; // Replace with your article's CSS selector

  let current_page = 1;
  let car_brand = "volkswagen";
  let car_model = "transporter";

  // important autogidas https://autogidas.lt/skelbimai/automobiliai/volkswagen/transporter/?page=2
  // autoplius https://autoplius.lt/skelbimai/naudoti-automobiliai/volkswagen/transporter?page_nr=2
  let url =
    "https://autogidas.lt/skelbimai/automobiliai/" +
    car_brand +
    "/" +
    car_model +
    "/?page=" +
    current_page; // Replace with your target URL
  let data_collected = [];

  while (true) {
    console.log(url);
    const cars = await scrapper.scrapeWebsite(url, mainSelector, selectors);
    console.log(cars);
    if (cars) {
      const hasCommonObjects = cars.some((obj1) =>
        data_collected.some((obj2) => JSON.stringify(obj1) === JSON.stringify(obj2)),
      );

      if (hasCommonObjects) {
        console.log("last working page", current_page);
        console.log("exists", cars);
        break;
      }

      data_collected.push(...cars);
      console.log("Current page ", current_page);
      console.log("Data collected count ", data_collected.length);
      // Create a new array and add the new object
      current_page++;

      url =
        "https://autogidas.lt/skelbimai/automobiliai/" +
        car_brand +
        "/" +
        car_model +
        "/?page=" +
        current_page;
    } else {
      console.log("Collected data ", data_collected);
      break;
    }
  }
})();
