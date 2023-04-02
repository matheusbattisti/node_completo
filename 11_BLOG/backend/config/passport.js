const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ where: { email: username } });

          if (!user) {
            return done(null, false, {
              message: "Nome de usuário ou senha inválidos",
            });
          }

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            return done(null, false, {
              message: "Nome de usuário ou senha inválidos",
            });
          }

          return done(null, user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
