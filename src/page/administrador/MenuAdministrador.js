import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../component/SignOutComponent";

function MenuAdministrador() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Panel de Administrador</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <a href="#" className="list-group-item list-group-item-action">
            Gestionar Usuarios
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            Gestionar Ventas
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            Gestionar Informes
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            Gestionar Subastas
          </a>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default MenuAdministrador;
