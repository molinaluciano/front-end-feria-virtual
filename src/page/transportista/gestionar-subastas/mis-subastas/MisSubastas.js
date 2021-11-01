import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import { Link } from 'react-router-dom';

function MisSubastas() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Panel de Transportista</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <Link to="#" className="list-group-item list-group-item-action">
            *FORM DE LAS SUBASTAS EN LAS QUE EL TRANSPORTISTA ESTA PARTICIPANDO*
          </Link>
          <Link to="/transportista/gestionar-subastas" className="list-group-item list-group-item-action">
            Ir hacia atrás
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default MisSubastas;
