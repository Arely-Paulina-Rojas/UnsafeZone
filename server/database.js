const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost/unsafe-database", {
        useUnifiedTopology:true,
        useNewUrlParser: true
    })
    .then((db) => console.log("Conexion exitosa a la base de datos"))
    .catch((err) => console.error(err));
