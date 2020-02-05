var mongoose = require("mongoose");
var app = require("./app");
var port = 3700;

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/portfolio")
  .then(() => {
    console.log("CONECTADO A MONGODB...");
    //CREACION DEL SERVIDOR
    app.listen(port, () => {
      console.log("SERVIDOR EN FUNCIONAMIENTO EN URL: http://localhost:3700");
    });
  })
  .catch(err => {
    console.log(err);
  });
