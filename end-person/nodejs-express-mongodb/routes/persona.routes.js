module.exports = app => {
    const personas = require("../controllers/registro.controller");

    var router = require("express").Router();

    // Crear un nuevo usuario
    router.post("/", personas.create);

    // Traer todos los usuarios 
    router.get("/",personas.findAll);

    // Traer usuarios activos 
    router.get("/activos", personas.findAllActive);

    // Buscar una persona por id 
    router.get("/:id", personas.findOne);

    // Actualizar una persona por id 
    router.put("/:id", personas.update);

    // Eliminar una persona por id 
    router.delete("/:id", personas.delete);

    // Eliminar todos los usuarios
    router.delete("/", personas.deleteAll);


    app.use('/api/personas', router);
};