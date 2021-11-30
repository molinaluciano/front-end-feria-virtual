import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import { Link } from 'react-router-dom';
import BackToComponent from '../../../component/backToComponent';

function MenuGestionarUsuarios() {
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
                    Menu Gestionar Usuarios
                </h1>
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <Link
                        to='/administrador/gestionar-usuarios/gestionar-clientes'
                        className='list-group-item list-group-item-action'
                    >
                        Gestionar Clientes
                    </Link>
                    <Link
                        to='/administrador/gestionar-usuarios/gestionar-productores'
                        className='list-group-item list-group-item-action'
                    >
                        Gestionar Productores
                    </Link>
                    <Link
                        to='/administrador/gestionar-usuarios/gestionar-transportistas'
                        className='list-group-item list-group-item-action'
                    >
                        Gestionar Transportistas
                    </Link>

                    <BackToComponent />
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default MenuGestionarUsuarios;
