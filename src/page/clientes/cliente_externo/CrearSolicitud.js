import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { Link } from 'react-router-dom';
import { useState } from "react";
import swal from "sweetalert";
import { requestCreation } from "../../../service/Cliente-Externo/request-service"

function CrearSolicitud() {
  const [form, setHandleForm] = useState({
    idUsuario: localStorage.getItem("IDUSER"),
    idTipoSolicitud: 2,
    kilos: 0,
    idFruta: 10,
    idCalidad: 2
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
      const result = await requestCreation(form);
      console.log("🚀 ~ file: Login.js ~ line 48 ~ sendForm ~ result", result);
      swal({
        title: "Se ha creado tu solicitud de compra correctamente!",
        type: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.href = "/cliente_externo";
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
        <h1>Crear Solicitud</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <form onSubmit={sendForm} class="mb-2">
            <div className="row mb-3">
              <div class="col-4">
                <select class="form-control">
                  <option>Categoría Fruta</option>
                </select>
              </div>
              <div class="col-4">
                <select class="form-control">
                  <option>Fruta</option>
                </select>
              </div>
              <div class="col-1">
                <h5>Kg:</h5>
              </div>
              <div class="col-3">
                <input onChange={handleInputChange} type="number" id="inputKg" name="kilos" class="form-control">
                </input> 
              </div>
            </div>
            <button type="submit" className="list-group-item list-group-item-action">
            Crear Solicitud
            </button>
            <Link to="/cliente-externo/mis-compras" className="list-group-item list-group-item-action">
            Ir hacia atrás
            </Link>
          </form>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default CrearSolicitud;
