import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import { useParams } from 'react-router-dom';
import { auctionParticipation, getAuctionDetailById } from "../../../../service/Transportista/auctions-service";
import { getTrucksByCarrierId } from "../../../../service/Transportista/trucks-service"
import { getRoutesDetail } from "../../../../service/Productor/request-service"
import { useState, useEffect } from "react";
import BackToComponent from '../../../../component/backToComponent';
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
    console.log('auctionDetail', auctionDetail)
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
        <div className='form-group'>
          <div className='input-group mb-3 mt-3'>
            <div className='input-group-append input-group-text'>
                <label htmlFor='direccionPartida'>
                Dirección Partida:
                </label>
              </div>
              <input
                disabled={true}
                defaultValue={route.direccionPartida.toString()}
                id='direccionPartida'
                type='text'
                className='form-control'
                name='direccionPartida'
              />
            </div>
          </div>
          <div className='form-group'>
          <div className='input-group mb-3 mt-3'>
            <div className='input-group-append input-group-text'>
                <label htmlFor='direccionDestino'>
                Dirección Partida:
                </label>
              </div>
              <input
                disabled={true}
                defaultValue={route.direccionDestino.toString()}
                id='direccionDestino'
                type='text'
                className='form-control'
                name='direccionDestino'
              />
            </div>
          </div>
          <div className='form-group'>
          <div className='input-group mb-3 mt-3'>
            <div className='input-group-append input-group-text'>
                <label htmlFor='Fecha Retiro'>
                Dirección Partida:
                </label>
              </div>
              <input
                disabled={true}
                defaultValue={route.fechaRetiro.toString()}
                id='Fecha Retiro'
                type='text'
                className='form-control'
                name='Fecha Retiro'
              />
            </div>
          </div>
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
      <header className="App-header"                 style={{
                    backgroundColor: '#324c3f',
                }}>
        <h1 className="mt-5">Detalle Subasta N°{id}</h1>
        <div className="row">
          
          <form encType='multipart/form-data'>
            <div className='form-group'>
              <div className='input-group mb-3 mt-3'>
                <div className='input-group-append input-group-text'>
                    <label htmlFor='customerName'>
                        Nombre cliente:
                    </label>
                </div>
                <input
                  disabled={true}
                  defaultValue={auctionDetail.customerName.toString()}
                  id='customerName'
                  type='text'
                  className='form-control'
                  name='customerName'
                  />
              </div>  
            </div>
            <div className='form-group'>
              <div className='input-group mb-3 mt-3'>
                <div className='input-group-append input-group-text'>
                    <label htmlFor='customerMail'>
                        Mail Cliente:
                    </label>
                </div>
                <input
                  disabled={true}
                  defaultValue={auctionDetail.customerMail.toString()}
                  id='customerMail'
                  type='text'
                  className='form-control'
                  name='customerMail'
                  />
              </div>  
             </div> 
             <div className='form-group'>
              <div className='input-group mb-3 mt-3'>
                <div className='input-group-append input-group-text'>
                  <label htmlFor='customerPhone'>
                      Teléfono Cliente:
                  </label>
                </div>
                <input
                  disabled={true}
                  defaultValue={auctionDetail.customerPhone.toString()}
                  id='customerPhone'
                  type='text'
                  className='form-control'
                  name='customerPhone'
                  />
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group mb-3 mt-3'>
                <div className='input-group-append input-group-text'>
                    <label htmlFor='fruta'>
                        Fruta:
                    </label>
                </div>
                <input
                  disabled={true}
                  defaultValue={auctionDetail.fruta.toString()}
                  id='fruta'
                  type='text'
                  className='form-control'
                  name='fruta'
                  />
              </div>
            </div>  
            <div className='form-group'>
              <div className='input-group mb-3 mt-3'>
                        <div className='input-group-append input-group-text'>
                  <label htmlFor='quality'>
                      Calidad:
                  </label>
              </div>
              <input
                disabled={true}
                defaultValue={auctionDetail.quality.toString()}
                id='quality'
                type='text'
                className='form-control'
                name='quality'
                />
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group mb-3 mt-3'>
                <div className='input-group-append input-group-text'>
                    <label htmlFor='kilos'>
                        Kilos:
                    </label>
                </div>
                <input
                  disabled={true}
                  defaultValue={auctionDetail.kilos.toString()}
                  id='kilos'
                  type='text'
                  className='form-control'
                  name='kilos'
                  />
              </div>
             </div> 
             <div className='form-group'>
              <div className='input-group mb-3 mt-3'>
                <div className='input-group-append input-group-text'>
                  <label htmlFor='producerName'>
                    Nombre Productor:
                  </label>
                </div>
                <input
                  disabled={true}
                  defaultValue={auctionDetail.producerName.toString()}
                  id='producerName'
                  type='text'
                  className='form-control'
                  name='producerName'
                  />
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group mb-3 mt-3'>
                <div className='input-group-append input-group-text'>
                  <label htmlFor='producerMail'>
                      Mail Productor:
                  </label>
                </div>
                <input
                  disabled={true}
                  defaultValue={auctionDetail.producerMail.toString()}
                  id='producerMail'
                  type='text'
                  className='form-control'
                  name='producerMail'
                  />
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group mb-3 mt-3'>
                      <div className='input-group-append input-group-text'>
                <label htmlFor='producerPhone'>
                    Teléfono Productor:
                </label>
            </div>
            <input
              disabled={true}
              defaultValue={auctionDetail.producerPhone.toString()}
              id='producerPhone'
              type='text'
              className='form-control'
              name='producerPhone'
              />
            </div>
            </div>
          </form>
          <div className="mb-5">
            {displayRoutes}
          </div>
        </div>
      </header>
      <form onSubmit={sendForm}>
        <ul className="list-group mb-5">
          <li className="list-group-item">
          <div class="card text-center">
            <div class="card-body">
              <label for="inputPrecio">Precio Oferta:</label>
              <input onChange={handleInputChange} type="number" id="inputPrecio" name="precio" placeholder="Ingrese Oferta" class="form-control mb-3"></input> 
              <select onChange={handleInputChange} name="idCamion" id="idCamion" class="form-control mb-3">
                <option disabled selected>Seleccionar patente camión</option>
                {displayTrucks}
              </select>
              <button type="submit" class="btn btn-primary">Participar</button>
            </div>
          </div>
            <BackToComponent />
            <hr />
            <SignOutComponent />
          </li>
        </ul>
      </form>
    </div>
  );
}

export default ParticiparSubasta;
