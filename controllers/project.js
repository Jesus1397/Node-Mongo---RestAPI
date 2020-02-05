var Project = require("../models/project");
var fs = require("fs");

var controller = {
  home: function(req, res) {
    return res.status(200).send({
      message: " HOME "
    });
  },
  test: function(req, res) {
    return res.status(200).send({
      message: " METODO TEST"
    });
  },
  saveProject: function(req, res) {
    var project = new Project();

    var params = req.body;
    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = params.null;

    project.save((err, projectStored) => {
      if (err) {
        return res.status(500).send({
          message: "error al guardar el documento"
        });
      }
      if (!projectStored) {
        return res
          .status(404)
          .send({ message: "no se a podido guardar el projecto" });
      }
      return res.status(200).send({
        project: projectStored
      });
    });
  },
  getProject: function(req, res) {
    var projectId = req.params.id;

    if (projectId == null) {
      return res.status(404).send({
        message: "No existe..."
      });
    }
    Project.findById(projectId, (err, project) => {
      if (err) {
        return res.status(500).send({
          message: "Error al traer los datos"
        });
      }
      if (!project) {
        return res.status(404).send({
          message: "No existe..."
        });
      }
      return res.status(200).send({
        project
      });
    });
  },
  getProjects: function(req, res) {
    Project.find({})
      .sort("-year")
      .exec((err, projects) => {
        if (err) {
          return res.status(500).send({
            message: "error al devolver los datos"
          });
        }
        if (!projects) {
          return res.status(404).send({ message: "no hay projectos" });
        }
        return res.status(200).send({
          projects
        });
      });
  },
  updateProject: function(req, res) {
    var projectId = req.params.id;
    var update = req.body;
    Project.findByIdAndUpdate(
      projectId,
      update,
      { new: true },
      (err, projectUpdated) => {
        if (err) {
          return res.status(500).send({
            message: "Error al actualizar"
          });
        }
        if (!projectUpdated) {
          return res
            .status(404)
            .send({ message: "no hay projecto a actuializar" });
        }
        return res.status(200).send({
          project: projectUpdated
        });
      }
    );
  },
  deleteProject: function(req, res) {
    var projectId = req.params.id;
    Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
      if (err) {
        return res.status(500).send({
          message: "Error al borrar el proyecto"
        });
      }
      if (!projectUpdated) {
        return res.status(404).send({ message: "no hay projecto a borrar" });
      }
      return res.status(200).send({
        project: projectRemoved
      });
    });
  },
  uploadImage: function(req, res) {
    var projectId = req.params.id;
    var filName = "imagen no subida...";

    if (req.files) {
      var filePath = req.files.image.path;
      var fileSplit = filePath.split("\\");
      var fileName = fileSplit[1];
      var extSplit = fileName.split(".");
      var fileExt = extSplit[1];

      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        Project.findByIdAndUpdate(
          projectId,
          { image: fileName },
          { new: true },
          (err, projectUpdated) => {
            if (err) {
              return res.status(500).send({
                message: "La imagen no se subio "
              });
            }
            if (!projectUpdated) {
              return res.status(404).send({ message: "El proyecto no existe" });
            }
            return res.status(200).send({
              project: projectUpdated
            });
          }
        );
      } else {
        fs.unlink(filePath, err => {
          return res.status(200).send({
            message: "La extension no es valida "
          });
        });
      }
    } else {
      return res.status(200).send({
        message: filName
      });
    }
  }
};

module.exports = controller;
