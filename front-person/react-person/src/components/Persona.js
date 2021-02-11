import React, { useState, useEffect } from 'react';
import PersonaDataService from "../service/PersonaService";

const Persona = props => {
    const initialPersonaState = {
        id:null,
        Rut: "",
        Nombre: "",
        Apellido: "",
        correo: "",
        estado: false
    };

    const [currentPersona, setCurrentPersona] = useState(initialPersonaState);
    const [mensaje, SetMensaje] = useState("");

    const getPersona = id => {
        PersonaDataService.get(id)
        .then(response => {
            setCurrentPersona(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        getPersona(props.match.params.id);
      }, [props.match.params.id]);

    // encargarse(handle) del cambio de entrada
    const handleInputChange = event => {
        const { name, value} = event.target;
        // que hace esta linea se que hace una copia de la persona, pero le da un nuevo valor(? o columna
        setCurrentPersona({ ...currentPersona,[name]: value });
    };

    const updateActivo = status => {
        var data = {
            id: currentPersona.id,
            Rut: currentPersona.Rut,
            Nombre: currentPersona.Nombre,
            Apellido: currentPersona.Apellido,
            correo: currentPersona.correo,
            estado: status
        };

        PersonaDataService.update(currentPersona.id, data)
        .then(response => {
            setCurrentPersona({ ...currentPersona, estado: status});
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const updatePersona = () => {
        PersonaDataService.update(currentPersona.id, currentPersona)
        .then(response => {
            console.log(response.data);
            SetMensaje("¡La persona/usuario se actualizó correctamente!");
        })
        .catch(e => {
            console.log(e);
        });
    };

    const deletePersona = () => {
        PersonaDataService.remove(currentPersona.id)
        .then(response => {
            console.log(response.data);
            props.history.push("/personas");
        })
        .catch(e => {
            console.log(e);
        });
    };

    // implementacion para que se pueda ver las funciones realizadas
    return (
        <div>
          {currentPersona ? (
            <div className="edit-form">
              <h4>Persona/Usuario</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="rut">Rut</label>
                  <input
                    type="text"
                    className="form-control"
                    id="rut"
                    name="rut"
                    value={currentPersona.Rut}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={currentPersona.Nombre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    name="apellido"
                    value={currentPersona.Apellido}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="correo">Correo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="correo"
                    name="correo"
                    value={currentPersona.correo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <strong>Estado:</strong>
                  </label>
                  {currentPersona.estado ? "Activo" : "Inactivo"}
                </div>
              </form>
    
              {currentPersona.estado ? (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => updateActivo(false)}
                >
                  Inactivo
                </button>
              ) : (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => updateActivo(true)}
                >
                  Activo
                </button>
              )}
    
              <button className="badge badge-danger mr-2" onClick={deletePersona}>
                Eliminar 
              </button>
    
              <button
                type="submit"
                className="badge badge-success"
                onClick={updatePersona}
              >
                Actulizar!
              </button>
              <p>{mensaje}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Por favor presione alguna persona :D</p>
            </div>
          )}
        </div>
      );

};

export default Persona;