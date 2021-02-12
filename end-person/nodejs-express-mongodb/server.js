const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// inicializacion de app y de la bd 
const app = express();


var corsOptions ={
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// permite analizar solicitudes de tipo contenido -aplication/json
app.use(bodyParser.json());
// permite analizar solicitudes de ciertos tipos de url 
app.use(bodyParser.urlencoded({ extended: true }));
// ruta simple 
app.get("/", (req, res) => {
    res.json({mensaje: "Bienvenido a la Aplicación de Matias"});
});

const db = require("./models");
db.mongoose
   .connect(db.url,{
       useNewUrlParser: true,
       useUnifiedTopology: true
   })
   .then(() =>{
       console.log("Conectado correctamente a la base de datos!");
   })
   .catch(err =>{
       console.log("No se pudo conectar a la base! por el siguiente : ", err);
       process.exit();
   })


require("./routes/persona.routes")(app);
// modificar port y salida del server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});