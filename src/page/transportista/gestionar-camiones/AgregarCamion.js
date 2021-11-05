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
        <form>
          <div class="form-group mb-2">
            <label for="inputPatente">Patente</label>
            <input type="email" class="form-control" id="inputPatente" aria-describedby="emailHelp" placeholder=""/>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <select class="form-control">
                <option>Marca</option>
              </select>
            </div>
            <div class="col-6">
              <select class="form-control">
                <option>Modelo</option>
              </select>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-3">
              <select class="form-control">
                <option>Tipo Camion</option>
              </select>
            </div>
            <div class="col-3">
              <div className="row">
                <div className="col-6">
                  <label class="checkbox-inline">Revisión Técnica</label>
                </div>
                <div className="col-3">
                  <label class="checkbox-inline"><input type="radio" value=""/>Si</label>
                </div>
                <div className="col-3">
                 <label class="checkbox-inline"><input type="radio" value=""/>No</label>
                </div>
              </div>
            </div>
            <div class="col-3">
              <div className="row">
                <div className="col-6">
                  <label class="checkbox-inline">Refrigeración</label>
                </div>
                <div className="col-3">
                  <label class="checkbox-inline"><input type="radio" value=""/>Si</label>
                </div>
                <div className="col-3">
                 <label class="checkbox-inline"><input type="radio" value=""/>No</label>
                </div>
              </div>
            </div>
            <div class="col-3">
                  <label class="checkbox-inline">Kg</label> 
                  <label class="checkbox-inline"><input type="Number" value="1000"/></label> 
            </div>
          </div>
        </form>
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
