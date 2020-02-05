var express = require("express");
var ProjectController = require("../controllers/project");

var router = express.Router();

var multipart = require("connect-multiparty");
var multipartyMiddleware = multipart({
  uploadDir: "./uploads"
});
router.get("/home", ProjectController.home);
router.get("/test", ProjectController.test);
router.get("/save-project", ProjectController.saveProject);
router.get("/project/:id?", ProjectController.getProject);
router.get("/projects", ProjectController.getProjects);
router.put("/project/:id", ProjectController.updateProject);
router.delete("/project/:id", ProjectController.deleteProject);
router.post(
  "/project/:id",
  multipartyMiddleware,
  ProjectController.uploadImage
);

module.exports = router;
