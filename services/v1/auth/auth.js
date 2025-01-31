const { ErrorHandler } = require("../../../helper/error-handler");
const { BAD_GATEWAY, UNAUTHORIZED } = require("../../../helper/status-codes");

const { STATUS } = require("../../../utils/constant");
const { compare } = require("../../../utils/hash");
const { throwError } = require("../../../utils/throw-error");
const Token = require("../../../utils/token");

const login = async (req) => {
  try {
    const {
      email,
      mobileNumber,
      password,
      loginMethod = "mobileNumber",
      googleAuth = false,
    } = req.body;
    let user;
    return { success: true, message: "Login Successfull" };
  } catch (error) {
    throwError(error);
  }
};

const register = async (req) => {
  try {
    return { message: "Register successfull." };
  } catch (error) {
    throwError(error);
  }
};
module.exports = {
  login,
};
