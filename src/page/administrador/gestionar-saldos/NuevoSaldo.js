import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import swal from "sweetalert";
import {  useState } from "react";
import { Link } from 'react-router-dom';
import { createBalance } from "../../../service/Administrador/balance-services";

function NuevoSaldo() {
  const [form, setHandleForm] = useState({
    kilos: null,
    disponible: 1,
    idFruta: null,
    idCalidad: null
  });

  const validationForm = (formToValidate) => {
  console.log("🚀 ~ file: NuevoSaldo.js ~ line 19 ~ validationForm ~ formToValidate", formToValidate)
    
    if (
      formToValidate.kilos === null || formToValidate.idFruta === null
      || formToValidate.idCalidad === null  ||  formToValidate.kilos === "" 
      || formToValidate.idFruta === ""
      || formToValidate.idCalidad === ""
       ) {
      return false;
    }
    return true;
  };



  const handleInputChange = (event) => {
    console.log(form);
    setHandleForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const sendForm = async (event) => {
    event.preventDefault();
    if (!validationForm(form)) {
      swal({
        title: "Debe completar todos los campos!",
        type: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      })

      return;
    }


    try {
      const result = await createBalance(form);
      console.log("🚀 ~ file: Login.js ~ line 48 ~ sendForm ~ result", result);
      swal({
        title: "Saldo creado exitosamente!",
        type: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.href = "/administrador/gestionar-saldos";
      });
    } catch (error) {
      swal({
        title: error,
        type: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then(() => {
        // window.location.href = "/";
      });
    }
  };

  return (
    <div className="container">
      <header className="App-header mb-3">
        <h1>Nuevo Saldo</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
        <form onSubmit={sendForm}>
          <div class="form-group">
            <label for="inputKilos">Kilos</label>
            <input onChange={handleInputChange} type="text" class="form-control" id="inputKilos" name="kilos" placeholder=""/>
          </div>
          <div class="row mb-2">
            <div class="col-6">
            <label for="inputIdCalidad">ID Calidad</label>
            <input onChange={handleInputChange} type="text" class="form-control" id="inputIdCalidad" name="idCalidad" placeholder=""/>
          </div>
            <div class="col-6">
            <label for="inputIdFruta">ID Fruta</label>
            <input onChange={handleInputChange} type="text" class="form-control" id="inputIdFruta" name="idFruta" placeholder=""/>
            </div>
          </div>
          
       

          <div className="row mt-3">
            <div className="col-6">    
              <Link to="/administrador/gestionar-saldos" className="btn btn-primary w-75">
                Ir hacia atrás
              </Link>
            </div>
            <div className="col-6">
              <button type="submit" className="btn btn-primary w-75">
                Agregar Saldo
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

export default NuevoSaldo;
