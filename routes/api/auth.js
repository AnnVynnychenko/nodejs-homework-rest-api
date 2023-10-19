const express = require("express");

const authSchemas = require("../../schema/authSchema");
const ctrl = require("../../controllers/authControllers");
const { validateBody } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(authSchemas.registerSchema),
  ctrl.register
);
router.post("/login", validateBody(authSchemas.loginSchema), ctrl.login);

module.exports = router;
