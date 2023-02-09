import say from "say";
import fs from "fs";
import chalk from "chalk";
import prompt from "prompt";

// Criar as pastas para armazenar os arquivos
if (!fs.existsSync("texts")) {
  fs.mkdirSync("texts");
}
if (!fs.existsSync("audios")) {
  fs.mkdirSync("audios");
}

// Perguntar se o usuário quer inserir o texto pelo terminal ou por arquivo
console.log(
  chalk.yellow("Você deseja inserir o texto pelo terminal ou por arquivo?")
);
console.log(chalk.yellow("1. Terminal"));
console.log(chalk.yellow("2. Arquivo"));

prompt.start();
prompt.get(["option"], (err, result) => {
  if (err) {
    console.error(chalk.red(err));
    return;
  }

  // Se o usuário escolher a opção 1 (Terminal), peça para inserir o texto
  if (result.option === "1") {
    console.log(chalk.yellow("Insira o texto:"));
    prompt.get(["text"], (err, result) => {
      if (err) {
        console.error(chalk.red(err));
        return;
      }

      // Salvar o texto em uma pasta
      const text = result.text;
      fs.writeFileSync(`texts/text-${Date.now()}.txt`, text);

      // Converter o texto em áudio e salvar em uma pasta
      playAudio(text);

      exportAudio(text);
    });
  } else if (result.option === "2") {
    console.log(chalk.yellow("Insira o caminho do arquivo:"));
    prompt.get(["filePath"], (err, result) => {
      const filePath = result.filePath;

      fs.readFile(filePath, "utf8", (err, data) => {
        fs.writeFile(`./textos/${Date.now()}.txt`, data, (err) => {});

        playAudio(data);

        exportAudio(data);
      });
    });
  }
});

function playAudio(text) {
  say.speak(text, "", 0.5, (err) => {
    if (err) {
      console.error(chalk.red(err));
    }
    console.log(chalk.green("Áudio gerado com sucesso!"));
  });
}

function exportAudio(data) {
  say.export(data, "", 0.5, `./audios/${Date.now()}.wav`, (err) => {
    if (err) {
      console.error(chalk.red(err));
    }
    console.log(chalk.blue("Arquivo criado com sucesso!"));
  });
}
