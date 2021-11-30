import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import { Link } from 'react-router-dom';

function MenuClienteLocal() {
    return (
        <div className='container'>
            <div
                className=' jumbotron mt-5'
                style={{
                    backgroundColor: '#324c3f',
                    height: '200px',
                    paddingTop: '80px',
                }}
            >
                <h1
                    style={{
                        color: 'white',
                    }}
                >
                    Mis Compras
                </h1>
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <Link
                        to='/cliente_local/comprar-saldos'
                        className='list-group-item list-group-item-action'
                    >
                        Ver saldos disponibles
                    </Link>
                    <Link
                        to='/cliente_local/historial'
                        className='list-group-item list-group-item-action'
                    >
                        Historial
                    </Link>
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default MenuClienteLocal;
