const Contact = require("../models/Contact");
// TODO: Add joi verification

// List contacts as per user
exports.listContacts = async (req, res) => {
  try {
    let contacts = await Contact.find().populate("userId");
    if (!contacts) {
      contacts = [];
    }
    res.status(200).json({
      message: "Contact fetched Successfully",
      contactData: contacts,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong ",
      error: err,
    });
  }
};

// create contact
exports.createContact = async (req, res) => {
  const contactObj = {
    contactName: req.body.cname,
    contactEmail: req.body.cemail,
    contactPhone: req.body.cphone,
    contactType: req.body.ctype,
    userId: req.body.cuser,
  };

  try {
    const contact = new Contact(contactObj);
    await contact.save();
    res.status(200).json({
      message: "Contact saved Successfully",
      contactData: contact,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something Went Wrong ",
      error: err,
    });
  }
};

// Update a Contact By id
exports.updateContact = async (req, res) => {
  const id = req.params.id;
  const contactObj = {
    contactName: req.body.cname,
    contactEmail: req.body.cemail,
    contactPhone: req.body.cphone,
    contactType: req.body.ctype,
    userId: req.body.cuser,
  };
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, {
      $set: contactObj,
    });
    if (updatedContact == null) {
      res.status(400).json({
        message: "Something went wrong!ID not found",
      });
    } else {
      res.status(200).json({
        message: "Contact Updated Succesfully",
        updated: updatedContact,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong!",
      error: err,
    });
  }
};

// Update by name
exports.updateContactByName = async (req, res) => {
  const name = { contactName: req.params.name };
  const contactObj = {
    contactName: req.body.cname,
    contactEmail: req.body.cemail,
    contactPhone: req.body.cphone,
    contactType: req.body.ctype,
    userId: req.body.cuser,
  };
  try {
    const updatedContact = await Contact.findOneAndUpdate(name, {
      $set: contactObj,
    });
    if (updatedContact == null) {
      res.status(400).json({
        message: "Something went wrong!ID not found",
      });
    } else {
      res.status(200).json({
        message: "Contact Updated Succesfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
      error: err,
    });
  }
};

// Delete a Contact By Id
exports.deleteContactById = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (deletedContact == null) {
      res.status(400).json({
        message: "Something went wrong!ID not found",
      });
    } else {
      res.status(200).json({
        message: "Contact Deleted Succesfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
      error: err,
    });
  }
};

exports.getContactsByUser = async (req, res) => {
  try {
    let contacts = await Contact.find({ userId: req.params.userId }).populate(
      "userId"
    );
    if (!contacts) {
      contacts = [];
    }
    res.status(200).json({
      message: "Contacts Successfully fetched",
      user: contacts,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something Went Wrong!",
      error: err,
    });
  }
};

exports.getContactsById = async (req, res) => {
  const id = req.params.id;
  try {
    let contacts = await Contact.findById(id).populate("userId");

    if (!contacts) {
      contacts = [];
    }
    console.log(contacts);
    res.status(200).json({
      message: "Contacts Successfully fetched",
      user: contacts,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something Went Wrong!",
      error: err,
    });
  }
};
