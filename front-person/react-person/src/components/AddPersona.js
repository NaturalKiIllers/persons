import React, { useState } from 'react';
import PersonaDataService from '../service/PersonaService';

const AddPersona = () => {
    const initialPersonaState = {
        id: null,
        Rut: "",
        Nombre: "",
        Apellido: "",
        correo: "",
        estado: false
    };
    const [persona, setPersona] = useState(initialPersonaState);
    const [estado, setEstado] = useState(false);

    const handleInputChange = event => {
        const { name, value} = event.target;
        setPersona({ ...persona, [name]: value });
    };

    const savePersona = () => {
        var data = {
            Rut: persona.Rut,
            Nombre: persona.Nombre,
            Apellido: persona.Apellido,
            correo: persona.correo
        };

        PersonaDataService.create(data)
        .then(response => {
            setPersona({
                id: response.data.id,
                Rut: response.data.Rut,
                Nombre: response.data.Nombre,
                Apellido: response.data.Apellido,
                correo: response.data.correo,
                estado: response.data.estado
            });
            setEstado(true);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const newPersona = () => {
        setPersona(initialPersonaState);
        setEstado(false);
    };

    return (
        <div className="submit=form">
            {estado ? (
                <div>
                    <h4>¡Envió realizado correctamente!</h4>
                    <button className="btn btn-success" onClick={newPersona}>
                        Agregar
                    </button>
                </div>
            ): (
                <div>
                    <div className="form-group">
                        <label htmlFor="rut">Rut</label>
                        <input
                          type="text"
                          className="form-control"
                          id="rut"
                          required
                          value={persona.rut}
                          onChange={handleInputChange}
                          name="rut"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nombre"
                          required
                          value={persona.nombre}
                          onChange={handleInputChange}
                          name="nombre"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <input
                          type="text"
                          className="form-control"
                          id="apellido"
                          required
                          value={persona.apellido}
                          onChange={handleInputChange}
                          name="apellido"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="correo">Correo</label>
                        <input
                          type="text"
                          className="form-control"
                          id="correo"
                          required
                          value={persona.correo}
                          onChange={handleInputChange}
                          name="correo"
                        />
                    </div>

                    <button onClick={savePersona} className="btn btn-success">
                        Enviar
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddPersona;