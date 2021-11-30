import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../../../component/SignOutComponent';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

function MenuGestionarVentas() {
    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack();
    };

    return (
        <div className='container'>
            <header className='App-header'>
                <h1>Gestionar Ventas</h1>
            </header>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <Link
                        to='/administrador/gestionar-ventas/aceptar-solicitudes'
                        className='list-group-item list-group-item-action'
                    >
                        Aceptar Solicitudes de Compra
                    </Link>
                    <Link
                        to='#'
                        className='list-group-item list-group-item-action'
                    >
                        Controlar Estados
                    </Link>
                    <Link
                        to='#'
                        className='list-group-item list-group-item-action'
                    >
                        Gestionar Pagos
                    </Link>
                    <Link
                        to='#'
                        className='list-group-item list-group-item-action'
                    >
                        Ingresar Saldos
                    </Link>
                    <Button onClick={goToPreviousPath}>Volver atras</Button>

                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default MenuGestionarVentas;
