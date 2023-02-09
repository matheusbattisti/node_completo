// adicionar type: module no package
import chalk from "chalk";

const nota = 5;

if (nota >= 7) {
  console.log(chalk.green.bold("Parabéns, você passou!"));
} else {
  console.log(chalk.bgRed.black("Você precisa fazer a prova final!"));
}
