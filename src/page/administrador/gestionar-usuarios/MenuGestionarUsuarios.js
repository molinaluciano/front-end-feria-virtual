import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { Link } from 'react-router-dom';

function MenuGestionarUsuarios() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Menu Gestionar Usuarios</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <Link to="/administrador/gestionar-usuarios/gestionar-clientes" className="list-group-item list-group-item-action">
          Gestionar Clientes
          </Link>
          <Link to="/administrador/gestionar-usuarios/gestionar-productores" className="list-group-item list-group-item-action">
          Gestionar Productores
          </Link>
          <Link to="/administrador/gestionar-usuarios/gestionar-transportistas" className="list-group-item list-group-item-action">
          Gestionar Transportistas
          </Link>
          <Link to="/administrador" className="list-group-item list-group-item-action">
          Ir hacia atrás
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default MenuGestionarUsuarios;
