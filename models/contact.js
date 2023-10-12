const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Anna:HHoFjhS0OWtzlVuI@cluster0.gtb2cak.mongodb.net/db-contacts?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
