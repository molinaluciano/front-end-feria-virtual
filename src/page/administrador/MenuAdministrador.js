import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../component/SignOutComponent';
import { Link } from 'react-router-dom';
import { height } from '@mui/system';

function MenuAdministrador() {
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
                    Panel Administrador
                </h1>
            </div>

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
