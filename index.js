const dataLoader = require("./getdata");

let data_collected = [];

// Non profit project
// important autogidas https://autogidas.lt/skelbimai/automobiliai/volkswagen/transporter/?page=2
// autoplius https://autoplius.lt/skelbimai/naudoti-automobiliai/volkswagen/transporter?page_nr=2
(async () => {
  await dataLoader.getData(
    "https://autoplius.lt/skelbimai/naudoti-automobiliai/",
    "volkswagen",
    "transporter",
    data_collected,
  );
})();
