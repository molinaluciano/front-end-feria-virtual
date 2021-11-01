import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../component/SignOutComponent";
import { Link } from 'react-router-dom';


function MenuProductor() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Panel de Productor</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <Link to="/productor/gestionar-solicitudes/mis-solicitudes" className="list-group-item list-group-item-action">
            Gestionar solicitudes de venta
          </Link>
          <Link to="/productor/participar-solicitudes/solicitudes-disponibles" className="list-group-item list-group-item-action">
            Participar solicitudes de venta
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default MenuProductor;
