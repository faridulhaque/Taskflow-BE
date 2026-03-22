const {
  registerService,
  loginService,
  forgotPasswordService,
  recoverPasswordService,
  googleOnboardingService,
} = require("../services/auth.service");

const register = async (req, res, next) => {
  return await registerService(req, res, next);
};

const login = async (req, res, next) => {
  return await loginService(req, res, next);
};

const forgotPassword = async (req, res, next) => {
  return await forgotPasswordService(req, res, next);
};

const recoverPassword = async (req, res, next) => {
  return await recoverPasswordService(req, res, next);
};

const googleOnboarding = async (req, res, next) => {
  return await googleOnboardingService(req, res, next);
};

module.exports = {
  register,
  login,
  forgotPassword,
  recoverPassword,
  googleOnboarding,
};
