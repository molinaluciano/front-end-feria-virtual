import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { Link } from 'react-router-dom';

function AgregarCamion() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Agregar Camion</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <Link to="#" className="list-group-item list-group-item-action">
          *FORM PARA CREAR CAMION*
          </Link>
          <Link to="/transportista/gestionar-camiones/mis-camiones" className="list-group-item list-group-item-action">
          Ir hacia atrás
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default AgregarCamion;
