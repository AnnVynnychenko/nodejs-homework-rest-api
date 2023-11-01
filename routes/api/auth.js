const express = require("express");

const authSchemas = require("../../schema/authSchema");
const ctrl = require("../../controllers/authControllers");
const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();
router.post(
  "/register",
  validateBody(authSchemas.registerSchema),
  ctrl.register
);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post(
  "/verify",
  validateBody(authSchemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(authSchemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/users",
  authenticate,
  validateBody(authSchemas.updateSubscriptionSchema),
  ctrl.subscriptionUpdate
);

module.exports = router;
