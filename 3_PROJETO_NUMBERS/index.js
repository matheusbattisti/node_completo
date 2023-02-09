import readline from "readline-sync";
import chalk from "chalk";

console.log(chalk.blue("Bem-vindo ao jogo de adivinhação!"));
console.log(chalk.blue("Escolha o seu nível de dificuldade:"));
console.log(chalk.blue("1. Fácil (números de 1 a 10)"));
console.log(chalk.blue("2. Médio (números de 1 a 50)"));
console.log(chalk.blue("3. Difícil (números de 1 a 100)"));

const level = parseInt(
  readline.question("Insira o seu nível de dificuldade (1, 2 ou 3): ")
);
let maxNumber;

if (level === 1) {
  maxNumber = 10;
} else if (level === 2) {
  maxNumber = 50;
} else if (level === 3) {
  maxNumber = 100;
} else {
  console.log(
    chalk.red("Nível de dificuldade inválido, começando com o nível fácil.")
  );
  maxNumber = 10;
}

const numberToGuess = Math.floor(Math.random() * maxNumber) + 1;

console.log(chalk.green("Adivinhe o número entre 1 e " + maxNumber));

let tries = 0;
while (true) {
  tries++;
  const userGuess = parseInt(readline.question("Insira o seu palpite: "));
  if (userGuess === numberToGuess) {
    console.log(chalk.green("Parabéns, você adivinhou o número!"));
    console.log(chalk.green(`Você usou ${tries} tentativas.`));
    break;
  } else if (userGuess < numberToGuess) {
    console.log(chalk.red("O seu palpite é muito baixo, tente novamente!"));
  } else {
    console.log(chalk.red("O seu palpite é muito alto, tente novamente!"));
  }
}
