import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../component/SignOutComponent";

function MenuProductor() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Panel de Productor</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <a href="#" className="list-group-item list-group-item-action">
            Mis Solicitudes
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            Ver Solicitudes disponibles
          </a>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default MenuProductor;
