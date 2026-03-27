const router = require("express").Router();
const Project = require("../models/Project");


// 📦 GET all projects (tenant scoped)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({
      tenantId: req.tenant._id
    });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching projects" });
  }
});


// ➕ CREATE project
router.post("/", async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      tenantId: req.tenant._id
    });

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: "Error creating project" });
  }
});


// 🗑 DELETE project (tenant safe)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.tenant._id
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json({ msg: "Project deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting project" });
  }
});


module.exports = router;