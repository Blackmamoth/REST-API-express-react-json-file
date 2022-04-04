const fs = require("fs");
const path = require("path");

const writeToFile = (data) => {
  const filePath = path.join(__dirname, "data", "data.json");
  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("data.json updated");
  });
};

module.exports = { writeToFile };
