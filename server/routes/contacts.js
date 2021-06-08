const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.get("/getcontact", async (req, res) => {
  try {
    const contacts = await Contact.find();
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
});

router.post("/savecontact", async (req, res) => {
  const contactObj = {
    contactName: req.body.cname,
    contactEmail: req.body.cemail,
    contactPhone: req.body.cphone,
    contactType: req.body.ctype,
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
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const contactObj = {
    contactName: req.body.cname,
    contactEmail: req.body.cemail,
    contactPhone: req.body.cphone,
    contactType: req.body.ctype,
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
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
      error: err,
    });
  }
});

router.put("/updatebyname/:name", async (req, res) => {
  const name = { contactName: req.params.name };
  const contactObj = {
    contactName: req.body.cname,
    contactEmail: req.body.cemail,
    contactPhone: req.body.cphone,
    contactType: req.body.ctype,
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
});

router.delete("/delete/:id", async (req, res) => {
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
});

module.exports = router;
