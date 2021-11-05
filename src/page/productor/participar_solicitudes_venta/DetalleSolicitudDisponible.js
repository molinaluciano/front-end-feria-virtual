import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { Link } from 'react-router-dom';


function DetalleSolicitudDisponible() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Detalle Solicitud N*XX</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
         <button className="btn-primary mb-2">
            Participar
          </button>
         <Link to="/productor/participar-solicitudes/solicitudes-disponibles" className="list-group-item list-group-item-action">
            Ir hacia atrás
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default DetalleSolicitudDisponible;
