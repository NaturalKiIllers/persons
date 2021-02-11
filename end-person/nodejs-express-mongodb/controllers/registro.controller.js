const db = require("../models");
const Persona = db.personas;

// crear y guarda una nuevo usuario
exports.create = (req, res) => {
//validacion
   if(!req.body.Rut){
       res.status(400).send({mensaje: "El Rut no puede estar vacío."});
       return;
   }
// Crear un nuevo usuario
   const persona = new Persona({
       Rut: req.body.Rut,
       Nombre: req.body.Nombre,
       Apellido: req.body.Apellido,
       correo: req.body.correo,
       estado: req.body.estado
   });
// Guardar persona en la base
   persona
   .save(persona)
   .then(data => {
       res.send(data);
   })
   .catch(err => {
       res.status(500).send({
           mensaje:
           err.mensaje || "Ocurrio un error al crear al usuario"
       });
   })
};

// Buscar todas los usuarios
exports.findAll = (req, res) => {
    const rut = req.query.rut;
    // preguntar si verdaderamente es necesario el var o se puede ocupar const 
    var condition = rut ? {rut : { $regex: new RegExp(rut), $options: "i"}}:{};
    // buscar 
    Persona.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            mensaje:
            err.mensaje || "Se produjo un error al buscar las personas"
        });
    });
};
// no se si tiene sentido para este proyecto
// Buscar por un id 
exports.findOne = (req, res) =>{
    const id = req.params.id;
    
    Persona.findById(id)
    .then(data => {
        if(!data)
            res.status(404).send({mensaje: "No se encontro al usuario con dicho id= " + id});
        else res.send(data);
    })
    .catch(err => {
        res
            .status(500)
            .send({mensaje: "Se pordujo un error al recuperar la persona con id="+ id});
     });
};

// actualizar un usuario por id 
exports.update = (req, res) =>{
    // validacion de que no existe
    if(!req.body){
        return res.status(400).send({
            mensaje: "Los datos para actualizar no pueden estar vacíos!"
        });
    }
    // 
    const id = req.params.id;
    Persona.findByIdAndUpdate(id, req.body,{ useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({
                mensaje: `No se puede actualizar a la persona con ese id=${id}. Tal vez no exista!`
            });
        }else res.send({mensaje: "Persona actualizada correctamente!."});
    })
    .catch(err => {
        res.status(500).send({
            mensaje: "No se pudo actualizar a la persona con ese id= "+id
        });
    });
};

// eliminar un usuario por id
exports.delete = (req, res) =>{
    const id = req.params.id;
    Persona.findByIdAndRemove(id)
    .then(data =>{
        if(!data) {
            res.status(404).send({
                mensaje: `No se puede eliminar a la persona con ese id=${id}. Tal vez no exista!`
            });
        } else{
            res.send({
                mensaje: "Persona eliminada correctamente!."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            mensaje: "No se pudo eliminar a la persona con ese id= "+id
        });
    });
};

// eliminar todos los usuarios de la base 
exports.deleteAll = (req, res) =>{
    Persona.deleteMany({})
    .then(data => {
        res.send({
            mensaje: `${data.deleteCount} Personas eliminadas correctamente!`
        });
    })
    .catch(err => {
        res.status(500).send({
            mensaje:
            err.mensaje || "Ocurrieron problemas al eliminar a todos los usuarios"
        });
    });
};

// buscar todos los usuarios activos 
exports.findAllActive = (req, res) =>{
    Persona.find({ estado: true })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            mensaje:
            err.mensaje || "Ocurrio un error al recuperar todos los usuarios"
        });
    });
};
