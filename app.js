const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const v1 = require("./routes/v1");
const {
  handleError,
  validator,
  validateToken,
  morganLogger,
  validateSocket,
} = require("./middleware");
const sequelize = require("./config/db");

app.use("/", express.static("public"));

app
  .use(morganLogger)
  .use(cors())
  .use(
    bodyParser.urlencoded({
      limit: "100mb",
      extended: true,
      parameterLimit: 5000,
    })
  )
  .use(bodyParser.json({ limit: "100mb" }));

app.use(validateToken);
app.use(validator);

app.use("/v1", v1);

app.use((err, req, res, next) => {
  handleError(err, res);
});

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    throw err;
  });
module.exports = app;
