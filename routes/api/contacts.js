const express = require("express");
const {
  getAllContacts,
  getContact,
  deleteContact,
  createContact,
  updateContactBody,
  updateFavoriteContact,
} = require("../../controllers/contactsControllers");
const isValidId = require("../../middlewares/isValidId");
const {
  contactSchema,
  updateFavoriteSchema,
} = require("../../schema/contactSchema");
const validateBody = require("../../decorators/validateBody");

const contactValidate = validateBody(contactSchema);
const favoriteValidate = validateBody(updateFavoriteSchema);

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:id", isValidId, getContact);

router.post("/", contactValidate, createContact);

router.delete("/:id", isValidId, deleteContact);

router.put("/:id", isValidId, contactValidate, updateContactBody);

router.patch(
  "/:id/favorite",
  isValidId,
  favoriteValidate,
  updateFavoriteContact
);

module.exports = router;
