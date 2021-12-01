import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import { useParams } from 'react-router-dom';
import { auctionParticipation, getAuctionDetailById } from "../../../../service/Transportista/auctions-service";
import { getTrucksByCarrierId } from "../../../../service/Transportista/trucks-service"
import { getRoutesDetail } from "../../../../service/Productor/request-service"
import { useState, useEffect } from "react";
import { 
  getRequestById, 
  getQualityTypeById, 
  getUserById,
  getFruitById,
  } from "../../../../service/Productor/request-service"
import swal from "sweetalert";

function ParticiparSubasta() {
  let { id } = useParams();
  let carrierId = localStorage.getItem('IDUSER')

  const [trucks, setTrucks] = useState([])
  const [routes, setRoutes] = useState([])
  const [auctionDetail, setAuctionDetail] = useState({
    fruta: "",
    kilos: "",
    quality: "",
    customerName: "",
    customerPhone: "",
    customerMail: "",
    producerName: "",
    producerMail: "",
    producerPhone: "",
  })
  const [form, setForm] = useState({
    idSubasta: id,
    precio: 0,
    idCamion: 0
  })
  
  const fetchData = async () => {
    // GET AUCTION DETAIL
    const auctionDetail = await getAuctionDetailById(id)
    setAuctionDetail(auctionDetail);
    // GET ROUTES DETAIL 
    const routesDetail = await getRoutesDetail(id);
    setRoutes(routesDetail);
    // GET TRUCKS BY CARRIER
    const truckResponse = await getTrucksByCarrierId(carrierId);
    setTrucks(truckResponse);
  };

  const displayTrucks = trucks.map((truck) => {
    return(
      <option value={truck.idCamion}>{truck.patente}</option>
    )
  })

  const displayRoutes = routes.map((route, index) => {
    return(
      <div>
        <h1>Ruta {index + 1}</h1>
        <li class="list-group-item">Dirección Partida: {route.direccionPartida}</li>
        <li class="list-group-item">Dirección Destino: {route.direccionDestino}</li>
        <li class="list-group-item">Fecha Retiro: {route.fechaRetiro}</li>
      </div>
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
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Nombre Cliente: {auctionDetail.customerName}</li> 
          <li class="list-group-item">Mail Cliente: {auctionDetail.customerMail}</li>
          <li class="list-group-item">Teléfono Cliente: {auctionDetail.customerPhone}</li>
          <li class="list-group-item">Fruta Solicitada: {auctionDetail.fruta}</li>
          <li class="list-group-item">Calidad de la Fruta: {auctionDetail.quality}</li>
          <li class="list-group-item">Kilos de Fruta: {auctionDetail.kilos}</li>
          <li class="list-group-item">Productor Seleccionado: {auctionDetail.producerName}</li>
          <li class="list-group-item">Mail Productor: {auctionDetail.producerMail}</li>
          <li class="list-group-item">Teléfono Productor: {auctionDetail.producerPhone}</li>
        </ul>

        <ul class="list-group list-group-flush">
          {displayRoutes}
        </ul>
      </header>
      <form onSubmit={sendForm}>
        <ul className="list-group mb-5">
          <li className="list-group-item">
          <div class="card text-center">
            <div class="card-body">
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
