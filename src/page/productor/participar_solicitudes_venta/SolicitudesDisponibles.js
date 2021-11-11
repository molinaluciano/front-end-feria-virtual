import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { Link } from 'react-router-dom';
import { getRequestById } from "../../../service/Productor/get-requests"
import { useState, useEffect } from "react";

function SolicitudesDisponibles() {
  const [requests, setRequests] = useState([])

  const fetchData = async () => {
    const response = await getRequestById(3);
    console.log(response)
    setRequests(response);
  };

  const displayRequests = requests.map((request) => {
    return(
      <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">ID: {request.idUsuario}</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href={`/productor/participar-solicitudes/detalle-solicitud/${request.idSolicitud}`} class="btn btn-primary">Participar</a>
            </div>
          </div>
      </div>
    );
  })

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <header className="App-header">
        <h1>Solicitudes Disponibles</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
        <div class="row">
          {displayRequests}
        </div>
        <Link to="/productor" className="list-group-item list-group-item-action">
            Ir hacia atrás
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default SolicitudesDisponibles;
