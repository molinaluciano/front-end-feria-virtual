import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../component/SignOutComponent";

function MenuTransportista() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Panel de Transportista</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <a href="#" className="list-group-item list-group-item-action">
            Gestionar Camiones
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

export default MenuTransportista;
