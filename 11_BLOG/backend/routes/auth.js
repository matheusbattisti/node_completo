const express = require("express");
const AuthController = require("../controllers/AuthController");
const {
  loginValidations,
  registerValidations,
} = require("../validations/authValidations");

const router = express.Router();

router.post("/login", loginValidations, AuthController.login);
router.post("/register", registerValidations, AuthController.register);

module.exports = router;
