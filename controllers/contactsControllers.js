const { HttpError, ctrlWrapper } = require("../helpers");
const Contact = require("../models/contact");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(contacts);
};

const getContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new HttpError(404, "Contact not found");
  }
  res.json(contact);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw new HttpError(404, "Contact not found");
  }
  if (id) {
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: "contact deleted" });
  }
};

const createContact = async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  const { _id: owner } = req.user;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    throw new HttpError(400, "Missing required name field");
  }
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const updateContactBody = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const updatedContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!updatedContact) {
    throw new HttpError(404, "Contact not found");
  }
  if (updatedContact) {
    res.status(200).json(updatedContact);
  }
};

const updateFavoriteContact = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const updatedFavoriteContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!updatedFavoriteContact) {
    throw new HttpError(400, "Missing fields");
  }
  if (updatedFavoriteContact) {
    res.status(200).json(updatedFavoriteContact);
  }
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContactBody: ctrlWrapper(updateContactBody),
  updateFavoriteContact: ctrlWrapper(updateFavoriteContact),
};
