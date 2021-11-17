import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import { useParams } from 'react-router-dom';
import { auctionParticipation } from "../../../../service/Transportista/auctions-service";
import { getTrucksByCarrierId } from "../../../../service/Transportista/trucks-service"
import { useState, useEffect } from "react";
import swal from "sweetalert";

function ParticiparSubasta() {
  let { id } = useParams();

  const [trucks, setTrucks] = useState([])
  const [form, setForm] = useState({
    idSubasta: id,
    precio: 0,
    idCamion: ""
  })

  const fetchData = async () => {
    const response = await getTrucksByCarrierId(id);
    console.log(response)
    setTrucks(response);
  };

  const displayTrucks = trucks.map((truck) => {
    return(
      <option value={truck.idCamion}>{truck.patente}</option>
    )
  })

  const handleInputChange = (event) => {
    console.log(form);
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const sendForm = async (event) => {
    event.preventDefault();
    try {
      const result = await auctionParticipation(form);
      console.log("🚀 ~ file: Login.js ~ line 48 ~ sendForm ~ result", result);
      swal({
        title: "Participando en la subasta exitosamente!",
        type: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.href = "/transportista/gestionar-subastas/participar-subastas";
      });
    } catch (error) {
      swal({
        title: error,
        type: error,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.href = "/";
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  return (
    <div className="container">
      <header className="App-header">
        <h1>Detalle Subasta N*{id}</h1>
      </header>
      <form onSubmit={sendForm}>
        <ul className="list-group mb-5">
          <li className="list-group-item">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <label for="inputPrecio">Precio:</label>
              <input onChange={handleInputChange} type="number" id="inputPrecio" name="precio" class="form-control"></input> 
              <select onChange={handleInputChange} name="idCamion" id="idCamion" class="form-control mb-3">
                <option disabled selected>Seleccionar Camion</option>
                {displayTrucks}
              </select>
              <button type="submit" class="btn btn-primary">Participar</button>
            </div>
          </div>
            <hr />
            <SignOutComponent />
          </li>
        </ul>
      </form>
    </div>
  );
}

export default ParticiparSubasta;
