import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import { Link } from 'react-router-dom';


function SubastasDisponibles() {
  return (
    <div className="container">
    <header className="App-header">
      <h1>Subastas Disponibles</h1>
    </header>
    <ul className="list-group mb-5">
      <li className="list-group-item">
      <div class="row">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="/transportista/gestionar-subastas/participar-subastas/detalle-subasta" class="btn btn-primary">Participar</a>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="/transportista/gestionar-subastas/participar-subastas/detalle-subasta" class="btn btn-primary">Participar</a>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="/transportista/gestionar-subastas/participar-subastas/detalle-subasta" class="btn btn-primary">Participar</a>
            </div>
          </div>
        </div>
      </div>
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

export default SubastasDisponibles;
