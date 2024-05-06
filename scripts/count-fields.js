// readJson.js
const fs = require("fs");

// Specify the path to the JSON file
const filePath = "./db.json";

// Reading the JSON file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  // Parse the JSON data and print it
  const jsonData = JSON.parse(data);
  // If you want to access specific properties:
  // console.log(`Name: ${jsonData.name}, Age: ${jsonData.age}, Job: ${jsonData.job}`);

  const fields = [];
  const fieldCounts = {};

  Object.keys(jsonData.bingos).forEach((key) => {
    const bingo = jsonData.bingos[key];

    bingo.fields.map((field) => {
      const fieldString = field.toString();

      if (!fields.includes(fieldString)) {
        // if (
        //   fieldString.startsWith("10,81,54,29,47") ||
        //   fieldString.startsWith("03,27,36,89,70") ||
        //   fieldString.startsWith("13,55,41,69,93") ||
        //   fieldString.startsWith("14,77,38,02,85") ||
        //   fieldString.startsWith("91,70,39,63,07")
        // ) {
        //   return;
        // }
        console.log("hit", fieldString);

        fields.push(fieldString);
      } else {
        console.log("DUPLICATE", fieldString);
        fieldCounts[fieldString] = (fieldCounts[fieldString] || 0) + 1;
      }
    });
  });

  console.log(fields);
  console.log(fieldCounts);
});
