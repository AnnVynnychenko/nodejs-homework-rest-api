const express = require("express");
const { authenticate, upload } = require("../../middlewares");
const ctrl = require("../../controllers/usersController");

const router = express.Router();

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
