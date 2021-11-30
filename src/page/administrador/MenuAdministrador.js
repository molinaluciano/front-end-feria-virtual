import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../component/SignOutComponent';
import { Link } from 'react-router-dom';

function MenuAdministrador() {
    return (
        <div className='container'>
            <header className='App-header'>
                <h1>Panel de Administrador</h1>
            </header>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <Link
                        to='/administrador/gestionar-usuarios'
                        className='list-group-item list-group-item-action'
                    >
                        Gestionar Usuarios
                    </Link>
                    <Link
                        to='/administrador/gestionar-ventas'
                        className='list-group-item list-group-item-action'
                    >
                        Gestionar Ventas
                    </Link>

                    <Link
                        to='/administrador/gestionar-saldos'
                        className='list-group-item list-group-item-action'
                    >
                        Gestionar Saldos
                    </Link>
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default MenuAdministrador;
