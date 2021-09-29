import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../component/SignOutComponent";
function MenuClienteExterno() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Panel de Cliente Externo</h1>
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

export default MenuClienteExterno;
