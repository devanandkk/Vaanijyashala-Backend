const express = require("express");
const router = express.Router();
const { dispatcher } = require("../../../middleware");
const { auth } = require("../../../controllers/v1");

router.post("/login", (req, res, next) => {
  dispatcher(req, res, next, auth.login);
});

module.exports = router;
