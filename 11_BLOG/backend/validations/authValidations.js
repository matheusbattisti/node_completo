const { body } = require("express-validator");

// Validação para a rota de login
const loginValidations = [
  body("email").isEmail().withMessage("E-mail inválido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Senha deve ter pelo menos 6 caracteres"),
];

// Validação para a rota de registro
const registerValidations = [
  body("name").not().isEmpty().withMessage("Nome é obrigatório"),
  body("email").isEmail().withMessage("E-mail inválido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Senha deve ter pelo menos 6 caracteres"),
];

module.exports = { loginValidations, registerValidations };
