import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { Link } from 'react-router-dom';


function MisCamiones() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Mis Camiones</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <Link to="/transportista/gestionar-camiones/mis-camiones/agregar-camion" className="list-group-item list-group-item-action">
          Agregar Camion
          </Link>
          <Link to="#" className="list-group-item list-group-item-action">
          Editar Camion
          </Link>
          <Link to="/transportista" className="list-group-item list-group-item-action">
          Ir hacia atrás 
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default MisCamiones;
