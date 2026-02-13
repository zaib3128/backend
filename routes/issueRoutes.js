const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const {
  createIssue,
  getIssues,
  getStudentIssues,
  updateStatus
} = require("../controllers/issueController");

// Multer configuration for this router
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single('image'), createIssue);
router.get("/", getIssues);
router.get("/student/:id", getStudentIssues);
router.put("/:id", updateStatus);

module.exports = router;
