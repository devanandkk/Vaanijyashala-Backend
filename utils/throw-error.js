const { ErrorHandler } = require("../helper/error-handler");
const { SERVER_ERROR } = require("../helper/status-codes");
const { SERVER_ERROR_MSG } = require("./constant");

const throwError = (error) => {
  if (error.statusCode) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
  console.log(error);
  throw new ErrorHandler(SERVER_ERROR, SERVER_ERROR_MSG);
};
module.exports = {
  throwError,
};
