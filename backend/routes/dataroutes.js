const express = require("express");
const protectRoute = require("../middleware/protectRoutes");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Importing controller functions
const { getData, fetchData, editData, updateData, deleteData } = require("../controllers/dataController");

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');  // Define where the uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);  // Use the original file name for the uploaded files
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Define the routes
router.post('/create', protectRoute, upload.single('file'), getData);
router.get('/list', protectRoute, fetchData);
router.get('/editdata/:id', protectRoute, editData);
router.put('/update/:id', protectRoute,upload.single('file'),updateData);
router.delete('/delete/:id', protectRoute, deleteData);

module.exports = router;
