import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import { Link } from 'react-router-dom';


function ParticiparSubasta() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Participar Subastas</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <Link to="#" className="list-group-item list-group-item-action">
          *DESPLIEGUE DE SUBASTAS DISPONIBLES*
          </Link>
          <Link to="/transportista" className="list-group-item list-group-item-action">
          Ir hacia atrás 
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default ParticiparSubasta;
