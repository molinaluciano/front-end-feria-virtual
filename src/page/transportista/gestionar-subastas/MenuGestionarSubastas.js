import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import BackToComponent from '../../../component/backToComponent';
import { Link } from 'react-router-dom';

function MenuGestionarSubastas() {
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
                    Panel de Transportista
                </h1>
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <Link
                        to='/transportista/gestionar-subastas/mis-subastas'
                        className='list-group-item list-group-item-action'
                    >
                        Mis Subastas
                    </Link>
                    <Link
                        to='/transportista/gestionar-subastas/participar-subastas'
                        className='list-group-item list-group-item-action'
                    >
                        Participar Subasta
                    </Link>
                    <BackToComponent />
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default MenuGestionarSubastas;
