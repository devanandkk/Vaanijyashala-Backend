const { ErrorHandler } = require("../../../helper/error-handler");
const { BAD_GATEWAY, UNAUTHORIZED } = require("../../../helper/status-codes");
const { users } = require("../../../models");
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
    if (loginMethod === "mobileNumber") {
      user = await users
        .findOne({ mobileNumber: mobileNumber })
        .populate("role");
    }
    if (loginMethod === "email") {
      user = await users.findOne({ email: email }).populate("role");
    }
    if (!user) {
      throw new ErrorHandler(BAD_GATEWAY, "Invalid username or password");
    }

    if (user.googleAuth && !googleAuth) {
      throw new ErrorHandler(BAD_GATEWAY, "Invalid username or password1");
    }

    if (!googleAuth) {
      const checkPassword = await compare(user.password, password);
      if (!checkPassword) {
        throw new ErrorHandler(BAD_GATEWAY, "Invalid username or password2");
      }
    }

    if (user.status === STATUS.SUSPENDED || user.status === STATUS.DELETED) {
      throw new ErrorHandler(
        UNAUTHORIZED,
        "Account suspended. Contact us for further details."
      );
    }

    const token = Token(user._id, user.role.role);

    return {
      userId: user._id,
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: user.role.role,
      status: user.status,
      authorization: token,
    };
  } catch (error) {
    throwError(error);
  }
};
module.exports = {
  login,
};
