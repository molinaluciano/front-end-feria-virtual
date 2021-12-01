import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../../component/SignOutComponent';
import { Link } from 'react-router-dom';
import { getAuctionsByStatus } from "../../../../service/Transportista/auctions-service"
import { getUserById, getRequestById, getFruitById } from "../../../../service/Productor/request-service";
import { useState, useEffect } from "react";
import BackToComponent from '../../../../component/backToComponent';
function SubastasDisponibles() {
  const [auctions, setAuctions] = useState([])
  
  const fetchData = async () => {
    const auctionsResponse = await getAuctionsByStatus(1);
    
    let auctionsDetails = []
    
    const details = async (x) => {
      const requestInformation = await getRequestById(x.idSolicitud);
      const idUsuario = requestInformation[0].idUsuario;
      const idFruta = requestInformation[0].detallesSolicitud[0].idFruta;
      const fechaPublicacion = requestInformation[0].fechaPublicacion;
      const kilos = requestInformation[0].detallesSolicitud[0].kilos
      const userInformation = await getUserById(idUsuario);
      const fruta = await getFruitById(idFruta)
      
      let req = {
        auctionId: x.idSubasta,
        customerName: `${userInformation.nombre} ${userInformation.apellidoPaterno} ${userInformation.apellidoMaterno}`,
        fruta: fruta.nombreFruta,
        kilos: kilos,
        fechaPublicacion: fechaPublicacion
      }
      
      return req;
    }
    
    for (const auction of auctionsResponse){
      auctionsDetails.push(details(auction))
    }
    
    Promise.all(auctionsDetails).then(values => {
      setAuctions(values);
    })
    
    console.log('auctions', auctions)
  };
  
  const displayAuctions = auctions.map((auction) => {
    return(
            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">Fruta: {auction.fruta}</h5>
                    <p class="card-text">Nombre cliente: {auction.customerName}</p>
                    <p class="card-text">Fecha publicación: {auction.fechaPublicacion}</p>
                    <p class="card-text">Kilos: {auction.kilos}</p>
                    <a href={`/transportista/gestionar-subastas/participar-subastas/detalle-subasta/${auction.auctionId}`} class="btn btn-primary">Participar</a>
                    </div>
                </div>    
            </div> 
        );
    });

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container'>
            <div
                className=' jumbotron mt-5'
                style={{
                    backgroundColor: '#324c3f',
                    height: '200px',
                    paddingTop: '80px',
                }}
            >
                <h1
                    style={{
                        color: 'white',
                    }}
                >
                    Subastas Disponibles
                </h1>
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <div class='row'>{displayAuctions}</div>
                    <BackToComponent />
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default SubastasDisponibles;
