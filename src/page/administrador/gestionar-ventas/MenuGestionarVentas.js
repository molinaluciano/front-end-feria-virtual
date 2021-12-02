import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import BackToComponent from '../../../component/backToComponent';

function MenuGestionarVentas() {
    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack();
    };

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
                    Gestionar Ventas
                </h1>
            </div>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <Link
                        to='/administrador/gestionar-ventas/aceptar-solicitudes'
                        className='list-group-item list-group-item-action'
                    >
                        Aceptar Solicitudes de Compra
                    </Link>
                    <Link
                        to='/administrador/gestionar-ventas/controlar_solicitudes'
                        className='list-group-item list-group-item-action'
                    >
                        Controlar Solicitudes
                    </Link>
                    <Link
                        to='/administrador/gestionar-ventas/controlar_ventas'
                        className='list-group-item list-group-item-action'
                    >
                        Controlar Ventas
                    </Link>
                    <Link
                        to='#'
                        className='list-group-item list-group-item-action'
                    >
                        Gestionar Pagos
                    </Link>
                    <BackToComponent />
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default MenuGestionarVentas;
