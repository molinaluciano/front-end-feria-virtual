import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { Link } from 'react-router-dom';

function CrearSolicitud() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Crear Solicitud</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <form class="mb-2">
            <div className="row mb-3">
              <div class="col-6">
                <select class="form-control">
                  <option>Categoría Fruta</option>
                </select>
              </div>
              <div class="col-6">
                <select class="form-control">
                  <option>Fruta</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div class="col-6">
                <select class="form-control">
                  <option>Categoría Fruta</option>
                </select>
              </div>
              <div class="col-6">
                <select class="form-control">
                  <option>Fruta</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div class="col-6">
                <select class="form-control">
                  <option>Categoría Fruta</option>
                </select>
              </div>
              <div class="col-6">
                <select class="form-control">
                  <option>Fruta</option>
                </select>
              </div>
            </div>
          </form>
          <Link to="#" className="list-group-item list-group-item-action">
           Crear Solicitud
          </Link>
          <Link to="/cliente-externo/mis-compras" className="list-group-item list-group-item-action">
          Ir hacia atrás
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default CrearSolicitud;
