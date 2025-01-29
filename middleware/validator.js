const Joi = require("joi");
const { ErrorHandler } = require("../helper/error-handler");
const { BAD_GATEWAY } = require("../helper/status-codes");

const schemas = {};

const validator = (req, res, next) => {
  try {
    const key = `${req.path
      .split("/")
      .splice(2)
      .join("_")
      .split("-")
      .join("_")}_${req.method.toLowerCase()}`;

    const schema = schemas[key];
    console.log({ key: key });
    if (!schema) {
      return next();
    } else {
      const { value, error } = schema.validate(req.body);
      if (error) throw new ErrorHandler(BAD_GATEWAY, error.message);
      else next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = validator;
