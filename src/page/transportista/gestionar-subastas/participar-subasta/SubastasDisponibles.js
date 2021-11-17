import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import { Link } from 'react-router-dom';
import { getAuctionsByStatus } from "../../../../service/Transportista/auctions-service"
import { useState, useEffect } from "react";

function SubastasDisponibles() {
  const [auctions, setAuctions] = useState([])

  const fetchData = async () => {
    const response = await getAuctionsByStatus(1);
    console.log(response)
    setAuctions(response);
  };

  const displayAuctions = auctions.map((auction) => {
    return(
      <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">ID: {auction.idSubasta}</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href={`/transportista/gestionar-subastas/participar-subastas/detalle-subasta/${auction.idSubasta}`} class="btn btn-primary">Participar</a>
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
      <h1>Subastas Disponibles</h1>
    </header>
    <ul className="list-group mb-5">
      <li className="list-group-item">
      <div class="row">
        {displayAuctions}
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

export default SubastasDisponibles;
