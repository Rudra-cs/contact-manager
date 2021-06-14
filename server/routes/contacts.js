const express = require("express");
const router = express.Router();
const contactController = require("../controller/contact.controller");
const auth = require("../middleware/auth");
const multer = require("multer");

const upload = multer({ dest: "./uploads/" });

router.get("/getContact", contactController.listContacts);
//Routes does require authentication
router.post("/savecontact", auth, contactController.createContact);

router.put("/update/:id", auth, contactController.updateContact);

router.put("/updatebyname/:name", auth, contactController.updateContactByName);

router.delete("/delete/:id", auth, contactController.deleteContactById);

router.get(
  "/getContactsByUser/:userId",
  auth,
  contactController.getContactsByUser
);
router.get("/getContactsById/:id", auth, contactController.getContactsById);

router.post("/upload", upload.single("imagefile"), (req, res) => {
  res.status(200).json({
    details: req.file,
  });
});

module.exports = router;
