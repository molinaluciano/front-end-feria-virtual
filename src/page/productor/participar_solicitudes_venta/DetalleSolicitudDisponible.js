import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { 
requestParticipation, 
getRequestById, 
getQualityTypeById, 
getUserById,
getFruitById,
} from "../../../service/Productor/request-service"
import { requestDetailsById, getRequestDetailByIdResponse } from "../../../service/global-request" 
function DetalleSolicitudDisponible() {
  let { id } = useParams();

  const [requestDetail, setRequest] = useState({
    fruta: "",
    kilos: "",
    quality: "",
    customerName: "",
    customerPhone: "",
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
        window.location.href = "/productor/participar-solicitudes/solicitudes-disponibles";
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container" >
      <header className="App-header" style={{
                    backgroundColor: '#324c3f',
                    height: '200px',
                    paddingTop: '80px',
                }}>
        <h1>Detalle Solicitud N°{id}</h1>
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
                  defaultValue={requestDetail.customerName.toString()}
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
                  defaultValue={requestDetail.customerMail.toString()}
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
                  defaultValue={requestDetail.customerPhone.toString()}
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
                  defaultValue={requestDetail.fruta.toString()}
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
                defaultValue={requestDetail.quality.toString()}
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
                  defaultValue={requestDetail.kilos.toString()}
                  id='kilos'
                  type='text'
                  className='form-control'
                  name='kilos'
                  />
              </div>
            </div>
          </form>
      </header>
      <ul className="list-group mb-5">
        <form onSubmit={sendForm}>
          <li className="list-group-item">
            <label for="inputPrecio">Precio Oferta:</label>
            <input onChange={handleInputChange} type="text" class="form-control mb-2" id="inputPrecio" name="precio" placeholder=""/>
            <button className="btn-primary mb-2">
              Participar
            </button>
          <Link to="/productor/participar-solicitudes/solicitudes-disponibles" className="list-group-item list-group-item-action">
              Ir hacia atrás
            </Link>
            <hr />
            <SignOutComponent />
          </li>
        </form>
      </ul>
    </div>
  );
}

export default DetalleSolicitudDisponible;
