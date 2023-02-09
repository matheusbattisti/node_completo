const fs = require("fs");

console.log("Começando programa...");

fs.readFile("./file.txt", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("O conteúdo do arquivo é:", data.toString());
});

console.log("Terminando programa...");
