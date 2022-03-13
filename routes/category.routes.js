const express = require("express");
const router = express.Router();

// Multer
const uploadMulter = require("../middleware/upload.js");
const validationMulter = require("../middleware/validation.js")

// Controller
const { createCategory } = require("../controllers/category.controllers.js");
router.get("/", (req, res) => {
  res.json({
    success: true, 
    message: "Route Successful"
  })
});
router.post("/category", uploadMulter, validationMulter, createCategory)



module.exports = router;
