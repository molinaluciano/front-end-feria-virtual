import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { Link } from 'react-router-dom';

function MisCompras() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Mis Compras</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <Link to="/cliente-externo/crear-solicitud" className="list-group-item list-group-item-action">
          Crear Solicitud
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default MisCompras;
