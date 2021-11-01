import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { Link } from 'react-router-dom';

function MenuGestionarSubastas() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Panel de Transportista</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <Link to="/transportista/gestionar-subastas/mis-subastas" className="list-group-item list-group-item-action">
            Mis Subastas
          </Link>
          <Link to="/transportista/gestionar-subastas/participar-subastas" className="list-group-item list-group-item-action">
            Participar Subasta
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default MenuGestionarSubastas;
