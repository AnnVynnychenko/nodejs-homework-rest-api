const HttpError = require("../helpers/HttpError");
const Contact = require("../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new HttpError(404, "Contact not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new HttpError(404, "Contact not found");
    }
    if (id) {
      await Contact.findByIdAndDelete(id);
      res.status(200).json({ message: "contact deleted" });
    }
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      throw new HttpError(400, "Missing required name field");
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContactBody = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const updateFavoriteContact = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  deleteContact,
  createContact,
  updateContactBody,
  updateFavoriteContact,
};
