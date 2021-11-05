import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import { Link } from 'react-router-dom';


function ParticiparSubasta() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Detalle Subasta N*XX</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <select class="form-control mb-3">
                <option>Seleccionar Camion</option>
              </select>
            <a href="#" class="btn btn-primary">Participar</a>
          </div>
        </div>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default ParticiparSubasta;
