import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../component/SignOutComponent";

function MenuClienteLocal() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Panel de Cliente Local</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <a href="#" className="list-group-item list-group-item-action">
            Mis Compras
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            Crear nueva solicitud
          </a>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default MenuClienteLocal;
