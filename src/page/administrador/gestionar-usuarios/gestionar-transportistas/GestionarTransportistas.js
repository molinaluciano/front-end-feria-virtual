import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import { Link } from 'react-router-dom';

function GestionarTransportistas() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>GestionarTransportistas</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <Link to="/administrador/gestionar-usuarios/gestionar-transportistas/nuevo-transportista" className="list-group-item list-group-item-action">
           Nuevo Transportista
          </Link>
          <Link to="/administrador/gestionar-usuarios" className="list-group-item list-group-item-action">
           Ir hacia atrás
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default GestionarTransportistas;
