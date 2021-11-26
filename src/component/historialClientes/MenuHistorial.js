import 'bootstrap/dist/css/bootstrap.min.css';
import SignOutComponent from '../SignOutComponent';
import { Link, useHistory } from 'react-router-dom';
import { getRequestByClientId } from '../../service/Cliente-Externo/request-service';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

function MenuHistorial() {
    let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack();
    };

    return (
        <div className='container'>
            <header className='App-header'>
                <h1>Historial de compras y solicitudes</h1>
            </header>
            <ul className='list-group mb-5'>
                <li className='list-group-item'>
                    <Link
                        to={{
                            pathname: '/cliente/historial/solicitudes',
                        }}
                        className='list-group-item list-group-item-action'
                    >
                        Mis Solicitudes
                    </Link>
                    <Link
                        to='/cliente/historial/ventas'
                        className='list-group-item list-group-item-action'
                    >
                        Mis Compras
                    </Link>
                    <hr />
                    <Button onClick={goToPreviousPath}>Volver atras</Button>
                    <hr />
                    <SignOutComponent />
                </li>
            </ul>
        </div>
    );
}

export default MenuHistorial;
