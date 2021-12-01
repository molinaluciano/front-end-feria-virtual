import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../../component/SignOutComponent";
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { 
requestParticipation, 
getRequestById, 
getQualityTypeById, 
getUserById,
getFruitById,
} from "../../../../service/Productor/request-service"
import { requestDetailsById, getRequestDetailByIdResponse } from "../../../../service/global-request" 
function DetalleSolicitudDeCompra() {
  let { id } = useParams();

  const [requestDetail, setRequest] = useState({
    fruta: "",
    kilos: 0,
    quality: "",
    customerName: "",
    customerPhone: 0,
    customerMail: ""
  })
  const [form, setHandleForm] = useState({
      precio: 0,
      idSolicitud: id,
      idProductor: localStorage.getItem('IDUSER'),
  });

  const fetchData = async () => {
    const requestDetailResponse = await requestDetailsById(id);
    const requestId = requestDetailResponse[0].idSolicitud;
    const requestDetail = await getRequestDetailByIdResponse(requestId)

    setRequest({
      fruta: requestDetail.fruta,
      kilos: requestDetail.kilos,
      quality: requestDetail.quality,
      customerName: requestDetail.customerName,
      customerPhone: requestDetail.customerPhone,
      customerMail: requestDetail.customerMail
    })

  } 

  const handleInputChange = (event) => {
    console.log(form);
    setHandleForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const sendForm = async (event) => {
    event.preventDefault();
    try {
      const result = await requestParticipation(form);
      console.log("🚀 ~ file: Login.js ~ line 48 ~ sendForm ~ result", result);
      swal({
        title: "Estás participando correctamente!",
        type: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.href = "/productor/participar-solicitudes/solicitudes-disponibles";
      });
    } catch (error) {
      swal({
        title: error,
        type: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.href = "/";
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <header className="App-header">
        <h1>Detalle Solicitud N*{id}</h1>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Nombre Cliente: {requestDetail.customerName}</li>
            <li class="list-group-item">Mail Cliente: {requestDetail.customerMail}</li>
            <li class="list-group-item">Teléfono Cliente: {requestDetail.customerPhone}</li>
            <li class="list-group-item">Fruta Solicitada: {requestDetail.fruta}</li>
            <li class="list-group-item">Calidad de la Fruta: {requestDetail.quality}</li>
            <li class="list-group-item">Kilos de Fruta: {requestDetail.kilos}</li>
          </ul>
      </header>
      <ul className="list-group mb-5">
          <li className="list-group-item">
          <Link to="/administrador/gestionar-ventas/aceptar-solicitudes" className="list-group-item list-group-item-action">
              Ir hacia atrás
            </Link>
            <hr />
            <SignOutComponent />
          </li>
      </ul>
    </div>
  );
}

export default DetalleSolicitudDeCompra;
