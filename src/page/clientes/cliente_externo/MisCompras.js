import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../../component/SignOutComponent";
import { Link } from 'react-router-dom';
import { getRequestsByClient } from "../../../service/get-requests"
import { useEffect } from "react";
function MisCompras() {
  let { id } = localStorage.getItem('IDUSER')
  const fetchData = async () => {
    /// FALTA FETCH A PAISES
    const userRequestResult = await getRequestsByClient(id);
    console.log(userRequestResult)
    // userTypesResponse.shift()
    // setUserTypes(userTypesResponse);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <header className="App-header">
        <h1>Mis Compras</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <Link to="/cliente_externo/crear-solicitud" className="list-group-item list-group-item-action">
          Crear Solicitud
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default MisCompras;
