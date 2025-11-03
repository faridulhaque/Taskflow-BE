const express = require("express");
const {
  register,
  login,
  forgotPassword,
  recoverPassword,
} = require("../controllers/auth.controller");
const { commonError } = require("../middleWares/commonError");

const router = express.Router();

router.post("/register", register, commonError);
router.post("/login", login, commonError);
router.post("/forgot-password", forgotPassword, commonError);
router.post("/recover-password", recoverPassword, commonError);

module.exports = router;
