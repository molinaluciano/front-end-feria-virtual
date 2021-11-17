import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { Link, useParams } from 'react-router-dom';
import { useState } from "react";
import swal from "sweetalert";
import { requestParticipation } from "../../../service/Productor/request-service"

function DetalleSolicitudDisponible() {
  let { id } = useParams();

  const [form, setHandleForm] = useState({
      precio: 0,
      idSolicitud: id,
      idProductor: localStorage.getItem('IDUSER'),
  });

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


  return (
    <div className="container">
      <header className="App-header">
        <h1>Detalle Solicitud N*{id}</h1>
      </header>
      <ul className="list-group mb-5">
        <form onSubmit={sendForm}>
          <li className="list-group-item">
            <label for="inputPrecio">Precio</label>
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
