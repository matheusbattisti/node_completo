const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/User");

class AuthController {
  static async login(req, res, next) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({
          message: "Falha na autenticação",
          user: user,
          info: info,
        });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const token = jwt.sign({ id: user.id }, "minha-chave-secreta");

        return res.json({ token });
      });
    })(req, res, next);
  }

  static async register(req, res) {
    // Valida os campos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        return res.status(409).json({
          message: "Este e-mail já está sendo usado por outro usuário",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ userId: newUser.id }, "minha-chave-secreta");

      return res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.error("teste: ", error);
      res.status(500).json({ message: "Erro ao criar usuário" });
    }
  }

  static async logout(req, res) {
    req.logout();
    res.json({ message: "Usuário desconectado com sucesso" });
  }
}

module.exports = AuthController;
