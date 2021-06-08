const mongoose = require("mongoose");
const ContactSchema = mongoose.Schema({
  contactName: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  contactType: {
    type: String,
    required: true,
  },
  //   contactPhoto: {
  //     type: String,
  //   },
});

module.exports = mongoose.model("contacts", ContactSchema);
// - Contact name
//   - Contact email
//   - Contact phone
//   - Contact Type
//   - Contact Photo
