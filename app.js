var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//CARGAR ARCHIVOS DE RUTAS
var project_routes = require("./routes/project");

//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CONF CABECERAS Y CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//ROUTES
app.use("/api", project_routes);

//EXPORT
module.exports = app;
