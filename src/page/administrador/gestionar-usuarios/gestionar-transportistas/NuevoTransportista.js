import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../component/SignOutComponent";

function NuevoTransportista() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>NuevoTransportista</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <a href="#" className="list-group-item list-group-item-action">
          NuevoTransportista
          </a>
          <a href="#" className="list-group-item list-group-item-action">
          NuevoTransportista
          </a>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default NuevoTransportista;
