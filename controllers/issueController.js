const Issue = require("../models/Issue");
const categorizeIssue = require("../utils/aiCategorizer");

// Create Issue
exports.createIssue = async (req, res) => {
  try {
    const { title, description, category, priority, studentId } = req.body;
    
    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const { category: aiCategory, priority: aiPriority } = categorizeIssue(description);

    const newIssue = new Issue({
      title,
      description,
      category: category || aiCategory,
      priority: priority || aiPriority,
      studentId: studentId || "general-user",
      image: req.file ? req.file.path : null
    });

    await newIssue.save();

    res.status(201).json(newIssue);
  } catch (error) {
    console.error("Create Issue Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Issues
exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Issues by Student ID
exports.getStudentIssues = async (req, res) => {
  try {
    const studentId = req.params.id;
    const issues = await Issue.find({ studentId }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Status
exports.updateStatus = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    issue.status = req.body.status;
    await issue.save();

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
