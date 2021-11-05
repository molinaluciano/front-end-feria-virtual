import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import { Link } from 'react-router-dom';

function MenuAdministrador() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Aceptar Solicitudes de Compra</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <div className="row">
            <div className="col-3">
                <h5>Id solicitud:</h5>
            </div>
            <div className="col-3">
                <h5>Nombre Cliente:</h5>
            </div>
            <div className="col-2">
                <a href="">Aceptar</a>
            </div>
            <div className="col-2">
                <a href="">Declinar</a>
            </div>
            <div className="col-2">
                <a href="">Detalle Solicitud</a>
            </div>
          </div>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default MenuAdministrador;
