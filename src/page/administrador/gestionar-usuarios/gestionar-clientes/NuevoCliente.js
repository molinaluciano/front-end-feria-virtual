import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import { Link } from 'react-router-dom';

function NuevoCliente() {
  return (
    <div className="container">
      <header className="App-header mb-3">
        <h1>NuevoCliente</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
        <form>
          <div class="form-group">
            <label for="inputName">Nombre</label>
            <input type="email" class="form-control" id="inputName" aria-describedby="emailHelp" placeholder=""/>
          </div>
          <div class="row mb-2">
            <div class="col-6">
            <label for="inputApellidoPa">Apellido Paterno</label>
            <input type="password" class="form-control" id="inputApellidoPa" placeholder=""/>
            </div>
            <div class="col-6">
            <label for="inputApellidoMa">Apellido Materno</label>
            <input type="email" class="form-control" id="inputApellidoMa" aria-describedby="emailHelp" placeholder=""/>
            </div>
          </div>
          <div class="form-group">
            <label for="inputCorreo">Correo</label>
            <input type="email" class="form-control" id="inputCorreo" aria-describedby="emailHelp" placeholder=""/>
          </div>
          <div class="row mb-2">
            <div class="col-6">
            <label for="inputPass">Contraseña</label>
            <input type="password" class="form-control" id="inputPass" placeholder=""/>
            </div>
            <div class="col-6">
            <label for="exampleInputEmail1">Confirmar Contraseña</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""/>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
            <label for="inputDireccion">Dirección</label>
            <input type="password" class="form-control" id="inputDireccion" placeholder=""/>
            </div>
            <div class="col-6">
              <div class="row mb-2">
                <div class="col-10">
                  <label for="inputRut">Rut</label>
                  <input type="email" class="form-control" id="inputRut" aria-describedby="emailHelp" placeholder=""/>
                </div>
                <div class="col-2">
                <label for="inputNumRut"></label>
                  <input type="email" class="form-control" id="inputNumRut" aria-describedby="emailHelp" placeholder=""/>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
            <label for="inputCodigoPostal">Código Postal</label>
            <input type="password" class="form-control" id="inputCodigoPostal" placeholder=""/>
            </div>
            <div class="col-6">
            <label for="inputTelefono">Teléfono</label>
            <input type="email" class="form-control" id="inputTelefono" aria-describedby="emailHelp" placeholder=""/>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <select class="form-control">
                <option>Seleccione País</option>
              </select>
            </div>
            <div class="col-6">
              <select class="form-control">
                <option>Tipo Cliente</option>
              </select>
            </div>
          </div>
        </form>

        <Link to="/administrador/gestionar-usuarios/gestionar-clientes" className="list-group-item list-group-item-action">
          Ir hacia atrás
        </Link>
        <hr />
        <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default NuevoCliente;
