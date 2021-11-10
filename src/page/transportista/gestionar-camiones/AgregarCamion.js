import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { createTruck } from "../../../service/Transportista/create-truck";
import { Link } from 'react-router-dom';
import {  useState } from "react";
import swal from "sweetalert";

function AgregarCamion() {
  const [form, setHandleForm] = useState({
    idCamion: null,
    idTipoCamion: 0,
    idTamanoCamion: 0,
    patente: "",
    modelo: "",
    marca: "",
    revisionTecnica: 0,
    idTransportista: 0,
    disponibilidad: 0
  });

  const validationForm = (formToValidate) => {
    if (formToValidate.idTipoCamion === 0 || formToValidate.idTamanoCamion === 0
      || formToValidate.patente === "" || formToValidate.modelo === 0
      || formToValidate.marca === "" || formToValidate.revisionTecnica === 0
      || formToValidate.idTransportista === 0 || formToValidate.disponibilidad === 0
      ){
      return false;
    }
    return true;
  };

  const handleInputChange = (event) => {
    setHandleForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const sendForm = async (event) => {
    event.preventDefault();
    // if (!validationForm(form)) {
    //   swal({
    //     title: "Debe completar todos los campos!",
    //     type: "error",
    //     confirmButtonColor: "#3085d6",
    //     confirmButtonText: "Ok",
    //   });

    //   return;
    // }

    try {
      const result = await createTruck(form);
      console.log("🚀 ~ file: Login.js ~ line 48 ~ sendForm ~ result", result);
      swal({
        title: "Camión creado exitosamente!",
        type: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.href = "/transportista/gestionar-camiones/mis-camiones";
      });
    } catch (error) {
      swal({
        title: error,
        type: error,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then(() => {
        // window.location.href = "/";
      });
    }
  }

  return (
    <div className="container">
      <header className="App-header">
        <h1>Agregar Camion</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
        <form onSubmit={sendForm}>
          <div class="form-group mb-2">
            <label for="inputPatente">Patente</label>
            <input onChange={handleInputChange} type="text" class="form-control" id="inputPatente" name placeholder=""/>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <select class="form-control">
                <option>Marca</option>
              </select>
            </div>
            <div class="col-6">
              <select class="form-control">
                <option>Modelo</option>
              </select>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-4">
              <select class="form-control">
                <option>Tipo Camion</option>
              </select>
            </div>
            <div class="col-4">
              <div className="row">
                <div className="col-6">
                  <label class="checkbox-inline">Revisión Técnica</label>
                </div>
                <div className="col-3">
                  <label class="checkbox-inline"><input type="radio" value=""/>Si</label>
                </div>
                <div className="col-3">
                 <label class="checkbox-inline"><input type="radio" value=""/>No</label>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div className="row">
                <div className="col-6">
                  <label class="checkbox-inline">Refrigeración</label>
                </div>
                <div className="col-3">
                  <label class="checkbox-inline"><input type="radio" value=""/>Si</label>
                </div>
                <div className="col-3">
                 <label class="checkbox-inline"><input type="radio" value=""/>No</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">    
              <Link to="/transportista/gestionar-camiones/mis-camiones" className="btn btn-primary w-75">
                Ir hacia atrás
              </Link>
            </div>
            <div className="col-6">
              <button type="submit" className="btn btn-primary w-75">
                Agregar Camión
              </button>
            </div>
          </div>
        </form>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default AgregarCamion;
