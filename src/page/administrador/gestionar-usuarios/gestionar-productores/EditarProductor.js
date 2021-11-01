import "bootstrap/dist/css/bootstrap.min.css";
import SignOutComponent from "../../component/SignOutComponent";
import { Link } from 'react-router-dom';

function EditarProductor() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>EditarProductor</h1>
      </header>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <a href="#" className="list-group-item list-group-item-action">
          EditarProductor
          </a>
          <a href="#" className="list-group-item list-group-item-action">
          EditarProductor
          </a>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  );
}

export default EditarProductor;
