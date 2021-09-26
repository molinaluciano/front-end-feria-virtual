import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { loginUsers } from "../../service/loginService";

function Login() {
  const [form, setHandleForm] = useState({
    email: "",
    password: "",
    idTypeUser: "",
  });

  const validationForm = (formToValidate) => {
    if (formToValidate.password === "" || formToValidate.email === "") {
      return false;
    }
    if (formToValidate.idTypeUser === 0 || formToValidate.idTypeUser === "") {
      return false;
    }

    return true;
  };

  const handleInputChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
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
      });

      return;
    }

    try {
      const result = await loginUsers(form);
      const menuProfile = result.toLowerCase();
      localStorage.setItem("PROFILE", menuProfile);
      window.location.href = "/" + menuProfile;
    } catch (error) {
      swal({
        title: "El usuario no se ha encontrado!",
        type: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.href = "/";
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("PROFILE")) {
      window.location.href = "/" + localStorage.getItem("PROFILE");
    }
  });

  return (
    <div className="container">
      <header className="App-header">
        <form onSubmit={sendForm}>
          <div className="mb-3">
            <label for="InputEmail" className="form-label">
              Correo Electronico
            </label>
            <input
              onChange={handleInputChange}
              name="email"
              placeholder="Correo Electronico"
              className="form-control"
              id="InputEmail"
            />
          </div>
          <div className="mb-3">
            <label for="InputPassword" className="form-label">
              Contraseña
            </label>
            <input
              onChange={handleInputChange}
              name="password"
              placeholder="Contraseña"
              type="password"
              className="form-control"
              id="InputPassword"
            />
          </div>
          <div className="mb-3 ">
            <select onChange={handleInputChange} name="idTypeUser">
              <option value="">Tipo de Usuario</option>
              <option value="1">Administrator</option>
              <option value="2">Cliente</option>
              <option value="3">Consultor</option>
              <option value="4">Productor</option>
              <option value="4">Transportista</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Iniciar Sesion
          </button>
        </form>
      </header>
    </div>
  );
}

export default Login;
