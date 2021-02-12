import React, { useState, useEffect } from 'react';
import PersonaDataService from "../service/PersonaService";
import { Link } from "react-router-dom";
import Persona from './Persona';

const PersonasList = () => {
    const [personas, setPersonas] = useState([]);
    const [currentPersona, setCurrentPersona] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchRut, setSearchRut] = useState("");

    useEffect(() => {
        // recuperar Personas
        retrievePersonas();
      }, []);

    const onChangeSearchRut = e => {
        const searchRut = e.target.value;
        setSearchRut(searchRut);
    };

    const retrievePersonas = () => {
        PersonaDataService.getAll()
        .then(response => {
            setPersonas(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    // refrezcar la lista
    const refreshList = () => {
        retrievePersonas();
        setCurrentPersona(null);
        setCurrentIndex(-1);
    };

    const setActivePerson = (persona, index) => {
        setCurrentPersona(persona);
        setCurrentIndex(index);
    };

    const removeAllPersonas = () => {
        PersonaDataService.removeAll()
        .then(response => {
            console.log(response.data);
            refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    };

    const findByRut = () => {
        PersonaDataService.findByRut(searchRut)
        .then(response =>{
            setPersonas(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    //todos las funciones hechas, ahora toca llamarlos 
    return(
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por Rut"
                        value={searchRut}
                        onChange={onChangeSearchRut}
                    />
                    <div className="input-group-append">
                        <button 
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByRut}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Lista de Personas</h4>

                <ul className="list-group">
                    {personas &&
                      personas.map((persona, index) => (
                          <li
                            className={
                                "list-group-item" + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActivePerson(persona, index)}
                            key={index}
                            >
                                {persona.rut}
                            </li>
                      ))}
                </ul>

                <button
                   className="m-3 btn btn-sm btn-danger"
                   onClick={removeAllPersonas}
                >
                    Eliminar a Todos
                </button>
            </div>
            <div className="col-md-6">
                {currentPersona ? (
                    <div>
                        <h4>Persona</h4>
                        <div>
                            <label>
                                <strong>Rut:</strong>
                            </label>{" "}
                            {currentPersona.rut}
                        </div>
                        <div>
                            <label>
                                <strong>Nombre:</strong>
                                </label>{" "}
                                {currentPersona.nombre}
                        </div>
                        <div>
                            <label>
                                <strong>Apellido:</strong>
                                </label>{" "}
                                {currentPersona.apellido}
                        </div>
                        <div>
                            <label>
                                <strong>Correo:</strong>
                                </label>{" "}
                                {currentPersona.correo}
                        </div>
                        <div>
                            <label>
                                <strong>Estado:</strong>
                                </label>{" "}
                                {currentPersona.estado ? "Activo" : "Inactivo"}
                        </div>

                        <Link
                        to={"/personas/" + currentPersona.id}
                        className="badge badge-warning"
                        >
                        Editar
                        </Link>
                    </div>
                    ) : (
                    <div>
                        <br />
                        <p>Por favor presione alguna persona :D</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default PersonasList;