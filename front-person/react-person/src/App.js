import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Switch} from 'react-router-dom';
import "./App.css";
// Agregar componentes
  import AddPersona from "./components/AddPersona";
  import Persona from "./components/Persona";
  import PersonasList from "./components/PersonasList";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/personas" className="navbar-brand">
            React-person
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/personas"} className="nav-link">
                Personas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Agregar :D
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/personas"]} component={PersonasList} />
            <Route exact path="/add" component={AddPersona} />
            <Route path="/personas/:id" component={Persona} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;