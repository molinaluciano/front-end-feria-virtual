import 'bootstrap/dist/css/bootstrap.min.css'
import SignOutComponent from '../../../../component/SignOutComponent'
import { Link } from 'react-router-dom'
import ListTransportistas from './ListTransportistas'

function GestionarTransportistas() {
  return (
    <div className="container">
      <div>
        <ListTransportistas />
      </div>
      <ul className="list-group mb-5">
        <li className="list-group-item">
          <Link
            to="/administrador/gestionar-usuarios"
            className="list-group-item list-group-item-action"
          >
            Ir hacia atrás
          </Link>
          <hr />
          <SignOutComponent />
        </li>
      </ul>
    </div>
  )
}

export default GestionarTransportistas
