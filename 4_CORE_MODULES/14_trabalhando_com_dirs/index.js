const fs = require('fs')

if (!fs.existsSync('./minhapasta')) {
  console.log('Não existe!')
  fs.mkdirSync('minhapasta')
} else if (fs.existsSync('./minhapasta')) {
  console.log('Existe!')
}
