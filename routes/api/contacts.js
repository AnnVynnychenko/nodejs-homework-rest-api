const express = require("express");
const ctrl = require("../../controllers/contactsControllers.js");
const contactSchemas = require("../../schema/contactSchema");
const { isValidId, validateBody, authenticate } = require("../../middlewares");

const contactValidate = validateBody(contactSchemas.contactSchema);
const favoriteValidate = validateBody(contactSchemas.updateFavoriteSchema);

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:id", authenticate, isValidId, ctrl.getContact);

router.post("/", authenticate, contactValidate, ctrl.createContact);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  contactValidate,
  ctrl.updateContactBody
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  favoriteValidate,
  ctrl.updateFavoriteContact
);

module.exports = router;
