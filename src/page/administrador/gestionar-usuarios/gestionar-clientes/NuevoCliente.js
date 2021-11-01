import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import { Link } from 'react-router-dom';

function NuevoCliente() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>NuevoCliente</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <a href="#" className="list-group-item list-group-item-action">
          NuevoCliente
          </a>
          <Link to="/administrador/gestionar-usuarios/gestionar-clientes" className="list-group-item list-group-item-action">
          Ir hacia atrás
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default NuevoCliente;
