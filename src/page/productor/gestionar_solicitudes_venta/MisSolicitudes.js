import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { Link } from 'react-router-dom';

function MisSolicitudes() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Mis Solicitudes</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <Link to="" className="list-group-item list-group-item-action">
            *DATAFRAME MIS SOLICITUDES
          </Link>
          <Link to="/productor" className="list-group-item list-group-item-action">
            Ir hacia atrás
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default MisSolicitudes;
